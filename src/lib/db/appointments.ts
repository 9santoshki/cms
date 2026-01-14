import { query } from './connection';

export interface Appointment {
  id: string;
  user_id?: string;
  appointment_date: string;
  service_type?: string;
  status: 'pending' | 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  guest_name?: string;
  guest_email?: string;
  guest_phone?: string;
  created_at?: string;
  updated_at?: string;
  user_name?: string;
  user_email?: string;
}

export async function createAppointment(appointment: {
  user_id?: string;
  appointment_date: string;
  service_type?: string;
  notes?: string;
  guest_name?: string;
  guest_email?: string;
  guest_phone?: string;
}): Promise<Appointment> {
  const result = await query(
    `INSERT INTO appointments (user_id, appointment_date, service_type, notes, status, guest_name, guest_email, guest_phone)
     VALUES ($1, $2, $3, $4, 'pending', $5, $6, $7)
     RETURNING *`,
    [
      appointment.user_id || null,
      appointment.appointment_date,
      appointment.service_type || null,
      appointment.notes || null,
      appointment.guest_name || null,
      appointment.guest_email || null,
      appointment.guest_phone || null,
    ]
  );
  return result.rows[0];
}

export async function getAppointmentById(id: string): Promise<Appointment | null> {
  const result = await query('SELECT * FROM appointments WHERE id = $1', [id]);
  return result.rows[0] || null;
}

export async function getAppointmentsByUserId(userId: string): Promise<Appointment[]> {
  const result = await query(
    `SELECT * FROM appointments WHERE user_id = $1 ORDER BY appointment_date DESC`,
    [userId]
  );
  return result.rows;
}

export async function getAllAppointments(): Promise<Appointment[]> {
  const result = await query(
    `SELECT
      a.*,
      COALESCE(a.guest_email, u.email) as user_email,
      COALESCE(a.guest_name, u.name) as user_name,
      a.guest_phone as user_phone
     FROM appointments a
     LEFT JOIN users u ON a.user_id = u.id
     ORDER BY a.created_at DESC`
  );
  return result.rows;
}

export async function updateAppointment(
  id: string,
  updates: Partial<Appointment>
): Promise<Appointment | null> {
  const fields: string[] = [];
  const values: any[] = [];
  let paramCount = 1;

  Object.entries(updates).forEach(([key, value]) => {
    if (value !== undefined && key !== 'id' && key !== 'user_id') {
      fields.push(`${key} = $${paramCount++}`);
      values.push(value);
    }
  });

  if (fields.length === 0) {
    return getAppointmentById(id);
  }

  values.push(id);

  const result = await query(
    `UPDATE appointments SET ${fields.join(', ')}, updated_at = NOW() WHERE id = $${paramCount} RETURNING *`,
    values
  );

  return result.rows[0] || null;
}

export async function deleteAppointment(id: string): Promise<boolean> {
  const result = await query('DELETE FROM appointments WHERE id = $1', [id]);
  return result.rowCount ? result.rowCount > 0 : false;
}

export async function updateAppointmentStatus(
  id: string,
  status: Appointment['status']
): Promise<Appointment | null> {
  const result = await query(
    `UPDATE appointments SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
    [status, id]
  );
  return result.rows[0] || null;
}
