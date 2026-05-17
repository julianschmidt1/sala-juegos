import { Injectable } from '@angular/core';
import { supabase } from '../../../core/supabase/supabase';

@Injectable({
  providedIn: 'root'
})
export class AhorcadoLeaderboardService {


  async saveResult(params: {
    userId: string;
    userName: string;
    won: boolean;
    wrongLetters: number;
  }): Promise<void> {
    const {
      userId,
      userName,
      won,
      wrongLetters
    } = params;

    const { data: existingPlayer, error } =
      await supabase
        .from('ahorcado_leaderboard')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

    if (error) {
      console.error(error);
      return;
    }

    if (!existingPlayer) {
      const { error: insertError } =
        await supabase
          .from('ahorcado_leaderboard')
          .insert({
            user_id: userId,
            user_name: userName,
            games_won: won ? 1 : 0,
            games_lost: won ? 0 : 1,
            wrong_letters: wrongLetters,
            last_played_at: new Date()
          });

      if (insertError) {
        console.error(insertError);
      }

      return;
    }

    const { error: updateError } =
      await supabase
        .from('ahorcado_leaderboard')
        .update({
          games_won:
            existingPlayer.games_won + (won ? 1 : 0),
          games_lost:
            existingPlayer.games_lost + (won ? 0 : 1),
          wrong_letters:
            existingPlayer.wrong_letters + wrongLetters,
          last_played_at: new Date()
        })
        .eq('user_id', userId);

    if (updateError) {
      console.error(updateError);
    }
  }
}