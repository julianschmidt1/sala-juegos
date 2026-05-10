import { Injectable } from '@angular/core';
import { supabase } from '../supabase/supabase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
      throw new Error(authError.message);
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

    return user;
  }

  async login(email: string, password: string) {

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password
      });

    if (error) {
      throw new Error(error.message);
    }

    return data.user;
  }

  async logout() {
    await supabase.auth.signOut();
  }

  async getCurrentUser() {

    const { user } = (await supabase.auth.getUser()).data;

    return user;
  }
}