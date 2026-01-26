import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookie, getUserProfile } from '@/lib/db/auth';
import {
  getReviews,
  getProductReviews,
  getProductRating,
  createReview,
  hasUserReviewedProduct,
} from '@/lib/db/reviews';

async function getUserFromRequest() {
  try {
    const session = await getSessionFromCookie();
    if (!session?.userId) return null;

    const profile = await getUserProfile(session.userId);
    return profile ? { userId: session.userId, role: profile.role, name: profile.name } : null;
  } catch (error) {
    console.error('Error getting user session:', error);
    return null;
  }
}

const corsHeaders = {
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,DELETE,PATCH,POST,PUT,OPTIONS',
  'Access-Control-Allow-Headers':
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

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
        return NextResponse.json(
          {
            success: true,
            data: {
              reviews,
              rating: rating.average_rating,
              reviewCount: rating.review_count,
            },
          },
          { headers: corsHeaders }
        );
      }

      return NextResponse.json(
        { success: true, data: reviews },
        { headers: corsHeaders }
      );
    }

    const user = await getUserFromRequest();
    if (!user || (user.role !== 'admin' && user.role !== 'moderator')) {
      return NextResponse.json(
        { success: false, error: 'Admin or moderator access required' },
        { status: 403, headers: corsHeaders }
      );
    }

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const result = await getReviews({
      status: status || undefined,
      page,
      limit,
    });

    return NextResponse.json(
      {
        success: true,
        data: result.reviews,
        total: result.total,
        page,
        limit,
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromRequest();

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required to submit a review' },
        { status: 401, headers: corsHeaders }
      );
    }

    const { product_id, rating, comment } = await request.json();

    // Validate required fields
    if (!product_id || !rating || !comment) {
      return NextResponse.json(
        { success: false, error: 'Product ID, rating, and comment are required' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, error: 'Rating must be between 1 and 5' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Check if user has already reviewed this product
    const hasReviewed = await hasUserReviewedProduct(user.userId, product_id);
    if (hasReviewed) {
      return NextResponse.json(
        { success: false, error: 'You have already reviewed this product' },
        { status: 400, headers: corsHeaders }
      );
    }

    const review = await createReview({
      user_id: user.userId,
      product_id,
      rating,
      comment,
    });

    return NextResponse.json(
      {
        success: true,
        data: review,
        message: 'Review submitted successfully. It will be visible after moderation.',
      },
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
}
