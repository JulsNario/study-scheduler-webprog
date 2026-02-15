import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class AppService {
  private supabase = createClient(
    'https://ftnuloorzbgdxiyunrxs.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0bnVsb29yemJnZHhpeXVucnhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyOTExODMsImV4cCI6MjA4NTg2NzE4M30.y-7g1dL4LMXaErOlIg6294kiOKWR-IEGuNnW_waq4s4'
  );

  async getTasks() {
    const { data } = await this.supabase.from('tasks').select('*').order('created_at', { ascending: false });
    return data;
  }

  async addTask(body: any) {
    const { data } = await this.supabase.from('tasks').insert([
      { subject: body.subject, topic: body.topic, study_date: body.study_date, is_completed: false }
    ]);
    return data;
  }

  async updateTask(id: string, body: any) {
    const { data, error } = await this.supabase
      .from('tasks')
      .update({ is_completed: body.is_completed })
      .eq('id', id);
    
    if (error) console.error("Supabase Update Error:", error);
    return data;
  }

  async deleteTask(id: string) {
    const { data, error } = await this.supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) console.error("Supabase Delete Error:", error);
    return data;
  }
}