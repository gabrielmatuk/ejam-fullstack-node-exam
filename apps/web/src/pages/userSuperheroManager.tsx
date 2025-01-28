import { useState } from "react"
import axios from "axios"
import type { Superhero, ApiError } from "../types"
import { API_URL } from "@/const"

export function useSuperheroManager() {

  const AUTH_HEADER = {
    Authorization: `Bearer secret`,
  };

  const [superheroes, setSuperheroes] = useState<Superhero[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchSuperheroes = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await axios.get<Superhero[]>(`${API_URL}/superheroes`, {
        headers: AUTH_HEADER,
      })
      setSuperheroes(response.data)
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const apiError = err.response.data as ApiError
        if (apiError.status === 404) {
          setSuperheroes([])
        } else {
          setError(apiError.message)
        }
      } else {
        setError("An unexpected error occurred")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const createSuperhero = async (superhero: Omit<Superhero, "id">) => {
    setIsLoading(true)
    setError(null)
    try {
      await axios.post(`${API_URL}/superheroes`, superhero, {
        headers: AUTH_HEADER,
      })
      await fetchSuperheroes()
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const apiError = err.response.data as ApiError
        setError(apiError.message)
      } else {
        setError("An unexpected error occurred")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return { superheroes, error, isLoading, createSuperhero, fetchSuperheroes }
}
