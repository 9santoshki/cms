import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookie, getUserProfile } from '@/lib/db/auth';
import { getReviewById, updateReviewStatus, deleteReview } from '@/lib/db/reviews';

// Verify user session and get user info
async function getUserFromRequest() {
  try {
    const session = await getSessionFromCookie();
    if (!session?.userId) return null;

    const profile = await getUserProfile(session.userId);
    return profile ? { userId: session.userId, role: profile.role } : null;
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

// Get a single review
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const review = await getReviewById(id);

    if (!review) {
      return NextResponse.json(
        { success: false, error: 'Review not found' },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { success: true, data: review },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error fetching review:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
}

// Update review status (approve/reject) - admin/moderator only
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUserFromRequest();

    if (!user || (user.role !== 'admin' && user.role !== 'moderator')) {
      return NextResponse.json(
        { success: false, error: 'Admin or moderator access required' },
        { status: 403, headers: corsHeaders }
      );
    }

    const { id } = await params;
    const { status } = await request.json();

    // Validate status
    if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status. Must be pending, approved, or rejected' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Check if review exists
    const existingReview = await getReviewById(id);
    if (!existingReview) {
      return NextResponse.json(
        { success: false, error: 'Review not found' },
        { status: 404, headers: corsHeaders }
      );
    }

    const updatedReview = await updateReviewStatus(id, status);

    console.log(`Review ${id} status updated to ${status} by ${user.role} ${user.userId}`);

    return NextResponse.json(
      {
        success: true,
        data: updatedReview,
        message: `Review ${status === 'approved' ? 'approved' : status === 'rejected' ? 'rejected' : 'updated'} successfully`,
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
}

// Delete a review - admin/moderator only
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUserFromRequest();

    if (!user || (user.role !== 'admin' && user.role !== 'moderator')) {
      return NextResponse.json(
        { success: false, error: 'Admin or moderator access required' },
        { status: 403, headers: corsHeaders }
      );
    }

    const { id } = await params;

    // Check if review exists
    const existingReview = await getReviewById(id);
    if (!existingReview) {
      return NextResponse.json(
        { success: false, error: 'Review not found' },
        { status: 404, headers: corsHeaders }
      );
    }

    const deleted = await deleteReview(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete review' },
        { status: 500, headers: corsHeaders }
      );
    }

    console.log(`Review ${id} deleted by ${user.role} ${user.userId}`);

    return NextResponse.json(
      { success: true, message: 'Review deleted successfully' },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
}
