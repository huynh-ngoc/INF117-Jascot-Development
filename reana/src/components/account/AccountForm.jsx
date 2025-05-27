'use client'

import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { cn } from "@/lib/utils"

// Create Account Form Component
export default function AccountForm({ onValidityChange, onDataChange }) {
  const [mounted, setMounted] = useState(false)
  const form = useForm({
    defaultValues: {
      email: '',
      verifyEmail: '',
      password: '',
      verifyPassword: '',
      emailPermissions: {
        newFeature: false,
        newsLetter: false,
        saleMarketing: false
      }
    }
  })

  const { watch, formState: { errors } } = form

  useEffect(() => {
    setMounted(true)
    const subscription = watch((value) => {
      // Send form data to parent
      if (onDataChange) {
        onDataChange(value)
      }
      
      // Send validation status to parent
      const isValid = !errors.email && !errors.verifyEmail && 
                     !errors.password && !errors.verifyPassword &&
                     value.email && value.verifyEmail &&
                     value.password && value.verifyPassword &&
                     value.email === value.verifyEmail &&
                     value.password === value.verifyPassword
      onValidityChange(isValid)
    })
    return () => subscription.unsubscribe()
  }, [watch, errors, onValidityChange, onDataChange])

  if (!mounted) {
    return null
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <h2 className="text-2xl font-semibold">Create Account</h2>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <FormField
                control={form.control}
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email format"
                  }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        className={cn(
                          "h-11",
                          errors.email ? "border-destructive" : ""
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="verifyEmail"
                rules={{
                  required: "Please verify your email",
                  validate: (value) => value === watch('email') || "Emails do not match"
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verify email *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Verify your email"
                        className={cn(
                          "h-11",
                          errors.verifyEmail ? "border-destructive" : ""
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters"
                  }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Set Password *</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Set your password"
                        className={cn(
                          "h-11",
                          errors.password ? "border-destructive" : ""
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="verifyPassword"
                rules={{
                  required: "Please verify your password",
                  validate: (value) => value === watch('password') || "Passwords do not match"
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verify Password *</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Verify your password"
                        className={cn(
                          "h-11",
                          errors.verifyPassword ? "border-destructive" : ""
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Email Permissions</h3>
                <div className="space-y-4">
                  {[
                    { id: 'newFeature', label: 'New Feature Release' },
                    { id: 'newsLetter', label: 'News Letter' },
                    { id: 'saleMarketing', label: 'Sale/marketing' }
                  ].map((permission) => (
                    <FormField
                      key={permission.id}
                      control={form.control}
                      name={`emailPermissions.${permission.id}`}
                      render={({ field }) => (
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id={permission.id}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="h-5 w-5"
                          />
                          <Label htmlFor={permission.id}>
                            {permission.label}
                          </Label>
                        </div>
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <div className="flex items-center gap-6 text-sm">
                  <Button variant="link" className="text-primary">
                    Forgot Password?
                  </Button>
                  <span className="text-muted-foreground">|</span>
                  <Button variant="link" className="text-primary">
                    Reset Password
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-1.5 text-sm text-muted-foreground">
              <span>By creating an account, you agree to our</span>
              <Button variant="link" className="text-primary p-0 h-auto">
                Privacy Policy
              </Button>
              <span>and</span>
              <Button variant="link" className="text-primary p-0 h-auto">
                Terms of Service
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}