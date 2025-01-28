import type React from "react"
import { useState } from "react"
import { useSuperheroManager } from "./userSuperheroManager"
import type { Superhero } from "../types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function SuperheroManager() {
  const { superheroes, error, isLoading, createSuperhero, fetchSuperheroes } = useSuperheroManager()
  const [newHero, setNewHero] = useState<Omit<Superhero, "id">>({
    name: "",
    superpower: "",
    humilityScore: 0,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewHero((prev) => ({
      ...prev,
      [name]: name === "humilityScore" ? Number.parseInt(value, 10) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createSuperhero(newHero)
    setNewHero({ name: "", superpower: "", humilityScore: 0 })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Superhero Manager</h1>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Create New Superhero</CardTitle>
          <CardDescription>Fill in the details to add a new superhero</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={newHero.name} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="superpower">Superpower</Label>
              <Input
                id="superpower"
                name="superpower"
                value={newHero.superpower}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="humilityScore">Humility Score</Label>
              <Input
                id="humilityScore"
                name="humilityScore"
                type="number"
                value={newHero.humilityScore}
                onChange={handleInputChange}
                required
                min="0"
                max="100"
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Superhero"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Superhero List</CardTitle>
          <CardDescription>All registered superheroes</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading superheroes...</p>
          ) : superheroes.length === 0 ? (
            <p>No superheroes found.</p>
          ) : (
            <ul className="space-y-2">
              {superheroes.map((hero, index) => (
                <li key={index} className="border p-2 rounded">
                  <strong>{hero.name}</strong> - {hero.superpower} (Humility: {hero.humilityScore})
                </li>
              ))}
            </ul>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={fetchSuperheroes} disabled={isLoading}>
            Refresh List
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
