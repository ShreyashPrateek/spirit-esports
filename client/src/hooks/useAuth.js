import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get current user
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        
        if (user) {
          // Try to get profile from database, fallback to basic profile
          try {
            const { data } = await supabase
              .from('profile')
              .select('*')
              .eq('id', user.id)
              .single();
            
            setUserProfile(data || {
              name: user.email.split('@')[0],
              email: user.email
            });
          } catch {
            setUserProfile({
              name: user.email.split('@')[0],
              email: user.email
            });
          }
        }
      } catch (error) {
        console.error('Error getting user:', error);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    // Ensure loading doesn't get stuck
    setTimeout(() => setLoading(false), 1000);

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // Always set a profile when user exists
        try {
          const { data } = await supabase
            .from('profile')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          setUserProfile(data || {
            name: session.user.email.split('@')[0],
            email: session.user.email
          });
        } catch {
          setUserProfile({
            name: session.user.email.split('@')[0],
            email: session.user.email
          });
        }
      } else {
        setUserProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserProfile(null);
  };

  return { user, userProfile, loading, signOut };
};