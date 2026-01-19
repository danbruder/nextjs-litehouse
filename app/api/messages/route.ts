import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const messages = db.prepare('SELECT * FROM messages ORDER BY created_at DESC LIMIT 10').all();
    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();
    
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    const result = db.prepare('INSERT INTO messages (text) VALUES (?)').run(text);
    
    return NextResponse.json({
      id: result.lastInsertRowid,
      text,
      message: 'Message created successfully'
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to create message' },
      { status: 500 }
    );
  }
}
