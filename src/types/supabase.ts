export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      faq: {
        Row: {
          id: string
          timesAsked: number | null
        }
        Insert: {
          id: string
          timesAsked?: number | null
        }
        Update: {
          id?: string
          timesAsked?: number | null
        }
      }
      hacker_applications: {
        Row: {
          address: string
          age: string
          apartment_suite: string
          city: string
          country: string
          dietary_restrictions_dairy_free: boolean
          dietary_restrictions_gluten_free: boolean
          dietary_restrictions_halal: boolean
          dietary_restrictions_other: string
          dietary_restrictions_vegetarian: boolean
          email: string
          gender: string
          grade: string
          id: string
          phone_number: string
          postal_code: string
          province: string
          question_1: string
          question_2: string
          school: string
          t_shirt_size: string
        }
        Insert: {
          address?: string
          age?: string
          apartment_suite?: string
          city?: string
          country?: string
          dietary_restrictions_dairy_free?: boolean
          dietary_restrictions_gluten_free?: boolean
          dietary_restrictions_halal?: boolean
          dietary_restrictions_other?: string
          dietary_restrictions_vegetarian?: boolean
          email: string
          gender?: string
          grade?: string
          id: string
          phone_number?: string
          postal_code?: string
          province?: string
          question_1?: string
          question_2?: string
          school?: string
          t_shirt_size?: string
        }
        Update: {
          address?: string
          age?: string
          apartment_suite?: string
          city?: string
          country?: string
          dietary_restrictions_dairy_free?: boolean
          dietary_restrictions_gluten_free?: boolean
          dietary_restrictions_halal?: boolean
          dietary_restrictions_other?: string
          dietary_restrictions_vegetarian?: boolean
          email?: string
          gender?: string
          grade?: string
          id?: string
          phone_number?: string
          postal_code?: string
          province?: string
          question_1?: string
          question_2?: string
          school?: string
          t_shirt_size?: string
        }
      }
      profiles: {
        Row: {
          created_at: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          id: string
        }
        Update: {
          created_at?: string | null
          id?: string
        }
      }
      "starboard-msgs": {
        Row: {
          id: string
          "starboard-message-id": string
        }
        Insert: {
          id: string
          "starboard-message-id": string
        }
        Update: {
          id?: string
          "starboard-message-id"?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
