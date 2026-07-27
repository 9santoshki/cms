import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { getReviewById, updateReviewStatus, deleteReview } from '@/lib/db/reviews';

// Get a single review
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const review = await getReviewById(id);

    if (!review) {
      return NextResponse.json(
        { success: false, error: 'Review not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: review });
  } catch (err: unknown) {
    console.error('[reviews/[id] GET] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Update review status (approve/reject) - admin/moderator only
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session || (session.role !== 'admin' && session.role !== 'moderator')) {
      return NextResponse.json(
        { success: false, error: 'Admin or moderator access required' },
        { status: 403 }
      );
    }

    const { id } = await params;
    const { status } = await request.json();

    if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status. Must be pending, approved, or rejected' },
        { status: 400 }
      );
    }

    const existingReview = await getReviewById(id);
    if (!existingReview) {
      return NextResponse.json(
        { success: false, error: 'Review not found' },
        { status: 404 }
      );
    }

    const updatedReview = await updateReviewStatus(id, status);

    return NextResponse.json({
      success: true,
      data: updatedReview,
      message: `Review ${status === 'approved' ? 'approved' : status === 'rejected' ? 'rejected' : 'updated'} successfully`,
    });
  } catch (err: unknown) {
    console.error('[reviews/[id] PATCH] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Delete a review - admin/moderator only
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session || (session.role !== 'admin' && session.role !== 'moderator')) {
      return NextResponse.json(
        { success: false, error: 'Admin or moderator access required' },
        { status: 403 }
      );
    }

    const { id } = await params;

    const existingReview = await getReviewById(id);
    if (!existingReview) {
      return NextResponse.json(
        { success: false, error: 'Review not found' },
        { status: 404 }
      );
    }

    const deleted = await deleteReview(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete review' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'Review deleted successfully' });
  } catch (err: unknown) {
    console.error('[reviews/[id] DELETE] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
