import {
  Injectable,
  computed,
  signal
} from '@angular/core';

import { supabase } from '../supabase/supabase';

export interface Profile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  age: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = signal<any | null>(null);
  currentProfile = signal<Profile | null>(null);
  isAuthenticated = computed(() =>
    Boolean(this.currentUser())
  );

  constructor() {
    supabase.auth.onAuthStateChange(
      (_event, session) => {
        const user = session?.user ?? null;
        this.currentUser.set(user);

        if (user) {
          this.loadProfile(user.id);

        } else {
          this.currentProfile.set(null);
        }
      }
    );

    this.restoreSession();
  }

  async restoreSession() {
    const { data } = await supabase.auth.getUser();
    const user = data.user;

    this.currentUser.set(user ?? null);

    if (user) {
      await this.loadProfile(user.id);
    }
  }

  async loadProfile(userId: string) {
    const { data, error } =
      await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();


    if (error) {
      throw new Error(error.message);
    }

    this.currentProfile.set(data);
  }

  async register(userData: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    age: number;
  }) {

    // Create user
    const { data: authData, error: authError } =
      await supabase.auth.signUp({
        email: userData.email,
        password: userData.password
      });

    if (authError) {
      throw new Error(authError.code);
    }

    const user = authData.user;

    if (!user) {
      throw new Error('Error al crear usuario');
    }

    // Create user profile
    const { error: profileError } =
      await supabase
        .from('profiles')
        .insert({
          id: user.id,
          email: userData.email,
          first_name: userData.first_name,
          last_name: userData.last_name,
          age: userData.age
        });

    if (profileError) {
      throw new Error(profileError.message);
    }

    await this.loadProfile(user.id);

    return user;
  }

  async login(email: string, password: string) {
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password
      });

    if (error) {
      throw new Error(error.code);
    }


    if (data.user) {
      await this.loadProfile(data.user.id);
    }

    return data.user;
  }

  async logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    this.currentUser.set(null);
    this.currentProfile.set(null);
  }

  get username(): string {
    const currentProfile = this.currentProfile();

    return `${currentProfile?.first_name ?? ''} ${currentProfile?.last_name ?? ''}`;
  }
}