import { supabase } from './supabaseClient';
import { Puppy, Parent, ScheduleEvent, BlogPost } from '../types';

export const dataService = {
  // Puppies
  async getPuppies(): Promise<Puppy[]> {
    const { data, error } = await supabase.from('puppies').select('*');
    if (error) throw error;
    return data || [];
  },
  async savePuppies(puppies: Puppy[]) {
    // 1. Get current IDs in DB
    const { data: existing, error: fetchError } = await supabase.from('puppies').select('id');
    if (fetchError) throw fetchError;
    
    const existingIds = (existing || []).map(item => item.id);
    const newIds = puppies.map(p => p.id);

    // 2. Delete items that were removed in UI
    const toDelete = existingIds.filter(id => !newIds.includes(id));
    if (toDelete.length > 0) {
      const { error: delError } = await supabase.from('puppies').delete().in('id', toDelete);
      if (delError) throw delError;
    }

    // 3. Upsert current items
    if (puppies.length > 0) {
      // Explicitly map fields to ensure we don't send unwanted properties
      const cleanPuppies = puppies.map(p => ({
        id: p.id,
        name: p.name,
        gender: p.gender,
        age: p.age,
        status: p.status,
        image: p.image,
        description: p.description,
        coatColor: p.coatColor,
        eyeColor: p.eyeColor,
        weight: p.weight,
        additionalImages: p.additionalImages || []
      }));

      const { error: upsertError } = await supabase.from('puppies').upsert(cleanPuppies);
      if (upsertError) throw upsertError;
    }
  },

  // Parents
  async getParents(): Promise<Parent[]> {
    const { data, error } = await supabase.from('parents').select('*');
    if (error) throw error;
    return data || [];
  },
  async saveParents(parents: Parent[]) {
    const { data: existing } = await supabase.from('parents').select('id');
    const existingIds = (existing || []).map(item => item.id);
    const newIds = parents.map(p => p.id);

    const toDelete = existingIds.filter(id => !newIds.includes(id));
    if (toDelete.length > 0) {
      await supabase.from('parents').delete().in('id', toDelete);
    }

    if (parents.length > 0) {
      const cleanParents = parents.map(p => ({
        id: p.id,
        name: p.name,
        role: p.role,
        image: p.image,
        breed: p.breed,
        weight: p.weight,
        description: p.description
      }));
      const { error: upsertError } = await supabase.from('parents').upsert(cleanParents);
      if (upsertError) throw upsertError;
    }
  },

  // Schedule
  async getSchedule(): Promise<ScheduleEvent[]> {
    const { data, error } = await supabase.from('schedule').select('*');
    if (error) throw error;
    return data || [];
  },
  async saveSchedule(schedule: ScheduleEvent[]) {
    const { data: existing } = await supabase.from('schedule').select('id, event');
    const existingIds = (existing || []).map(item => item.id);
    const newIds = schedule.map(s => s.id).filter(Boolean);

    const toDelete = existingIds.filter(id => !newIds.includes(id));
    if (toDelete.length > 0) {
      await supabase.from('schedule').delete().in('id', toDelete);
    }

    if (schedule.length > 0) {
      const cleanSchedule = schedule.map(s => ({
        id: s.id,
        event: s.event,
        period: s.period,
        date: s.date,
        details: s.details
      }));

      const { error: upsertError } = await supabase.from('schedule').upsert(cleanSchedule);
      if (upsertError) throw upsertError;
    }
  },

  // Blog Posts
  async getBlogPosts(): Promise<BlogPost[]> {
    const { data, error } = await supabase.from('blog_posts').select('*');
    if (error) throw error;
    return data || [];
  },
  async saveBlogPosts(posts: BlogPost[]) {
    const { data: existing } = await supabase.from('blog_posts').select('id');
    const existingIds = (existing || []).map(item => item.id);
    const newIds = posts.map(p => p.id);

    const toDelete = existingIds.filter(id => !newIds.includes(id));
    if (toDelete.length > 0) {
      await supabase.from('blog_posts').delete().in('id', toDelete);
    }

    if (posts.length > 0) {
      const cleanPosts = posts.map(p => ({
        id: p.id,
        title: p.title,
        excerpt: p.excerpt,
        content: p.content,
        category: p.category,
        date: p.date,
        image: p.image,
        author: p.author
      }));
      const { error: upsertError } = await supabase.from('blog_posts').upsert(cleanPosts);
      if (upsertError) throw upsertError;
    }
  },

  // Site Assets
  async getSiteAssets(): Promise<any> {
    const { data, error } = await supabase.from('site_assets').select('data').single();
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "no rows returned"
    return data?.data || null;
  },
  async saveSiteAssets(assets: any) {
    const { error } = await supabase.from('site_assets').upsert({ id: 'main', data: assets });
    if (error) throw error;
  }
};
