import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

// Initialize database connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

export async function PUT(request: NextRequest) {
  try {
    // Extract token from headers
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    // In a real app, you would verify the JWT here
    
    const { entity, entityId, updates } = await request.json();
    
    if (!entity || !entityId || !updates) {
      return NextResponse.json(
        { success: false, error: 'Entity type, entity ID, and updates are required' },
        { status: 400 }
      );
    }

    // Verify user permissions (simplified check)
    const client = await pool.connect();
    try {
      // Get user information to check permissions
      const userCheckQuery = `
        SELECT role, permissions FROM users 
        WHERE id = $1  -- In a real app, extract user ID from the token
      `;
      // For this mock, we'll assume the token contains user info
      // In a real implementation, decode the JWT and get user ID from payload
      
      // Validate permissions based on entity type
      let permissionCheck = true;
      let tableName = '';
      
      switch(entity.toLowerCase()) {
        case 'product':
          permissionCheck = true; // This would be based on user permissions
          tableName = 'products';
          break;
        case 'review':
          permissionCheck = true;
          tableName = 'reviews';
          break;
        case 'order':
          permissionCheck = true;
          tableName = 'orders';
          break;
        case 'payment':
          permissionCheck = true;
          tableName = 'payments';
          break;
        default:
          return NextResponse.json(
            { success: false, error: 'Invalid entity type' },
            { status: 400 }
          );
      }
      
      if (!permissionCheck) {
        return NextResponse.json(
          { success: false, error: 'Insufficient permissions to edit this entity' },
          { status: 403 }
        );
      }

      // Build dynamic update query
      const columns = Object.keys(updates);
      if (columns.length === 0) {
        return NextResponse.json(
          { success: false, error: 'No updates provided' },
          { status: 400 }
        );
      }
      
      // Build SET clause dynamically
      const setClause = columns.map((col, index) => `"${col}" = $${index + 2}`).join(', ');
      const query = `UPDATE ${tableName} SET ${setClause} WHERE id = $1 RETURNING *`;
      
      // Prepare values array [entityId, ...updateValues]
      const values = [entityId, ...Object.values(updates)];
      
      const result = await client.query(query, values);
      
      if (result.rows.length === 0) {
        return NextResponse.json(
          { success: false, error: 'Entity not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { success: true, data: result.rows[0] },
        { status: 200 }
      );
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Moderator update error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}