import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import {
  getReviews,
  getProductReviews,
  getProductRating,
  createReview,
  hasUserReviewedProduct,
} from '@/lib/db/reviews';
import { validatePositiveInt, validateReviewRating, validateString } from '@/lib/validation';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('product_id');
    const status = searchParams.get('status');
    const includeRating = searchParams.get('include_rating') === 'true';

    if (productId) {
      const reviews = await getProductReviews(productId);

      if (includeRating) {
        const rating = await getProductRating(productId);
        return NextResponse.json({
          success: true,
          data: {
            reviews,
            rating: rating.average_rating,
            reviewCount: rating.review_count,
          },
        });
      }

      return NextResponse.json({ success: true, data: reviews });
    }

    const session = await getSessionFromCookieWithDB();
    if (!session || (session.role !== 'admin' && session.role !== 'moderator')) {
      return NextResponse.json(
        { success: false, error: 'Admin or moderator access required' },
        { status: 403 }
      );
    }

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const result = await getReviews({
      status: status || undefined,
      page,
      limit,
    });

    return NextResponse.json({
      success: true,
      data: result.reviews,
      total: result.total,
      page,
      limit,
    });
  } catch (err: unknown) {
    console.error('[reviews GET] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Authentication required to submit a review' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { product_id, rating, comment } = body;

    // Validate required fields
    const productIdErr = validatePositiveInt(product_id, 'product_id');
    if (productIdErr) {
      return NextResponse.json({ success: false, error: productIdErr.message }, { status: 400 });
    }

    const ratingErr = validateReviewRating(rating);
    if (ratingErr) {
      return NextResponse.json({ success: false, error: ratingErr.message }, { status: 400 });
    }

    const commentErr = validateString(comment, 'comment', 2000);
    if (commentErr) {
      return NextResponse.json({ success: false, error: commentErr.message }, { status: 400 });
    }

    // Check if user has already reviewed this product
    const hasReviewed = await hasUserReviewedProduct(session.userId, String(product_id));
    if (hasReviewed) {
      return NextResponse.json(
        { success: false, error: 'You have already reviewed this product' },
        { status: 400 }
      );
    }

    const review = await createReview({
      user_id: session.userId,
      product_id: String(product_id),
      rating: Number(rating),
      comment: String(comment),
    });

    return NextResponse.json(
      {
        success: true,
        data: review,
        message: 'Review submitted successfully. It will be visible after moderation.',
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error('[reviews POST] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
