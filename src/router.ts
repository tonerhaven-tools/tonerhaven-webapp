// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks } from '@generouted/solid-router/client'

export type Path =
  | `/`
  | `/app`
  | `/app/orders`
  | `/app/profile`
  | `/cart`
  | `/contact-us`
  | `/dashboard`
  | `/dashboard/components/overview`
  | `/dashboard/components/products`
  | `/products`

export type Params = {
  
}

export type ModalPath = never

export const { A, Navigate } = components<Path, Params>()
export const { useMatch, useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
