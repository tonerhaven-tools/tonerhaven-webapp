// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks } from '@generouted/solid-router/client'

export type Path =
  | `/`
  | `/401`
  | `/403`
  | `/500`
  | `/app`
  | `/app/orders`
  | `/app/profile`
  | `/cart`
  | `/checkout`
  | `/contact-us`
  | `/dashboard`
  | `/dashboard/overview`
  | `/dashboard/products`
  | `/products`
  | `/products/:id`

export type Params = {
  '/products/:id': { id: string }
}

export type ModalPath = never

export const { A, Navigate } = components<Path, Params>()
export const { useMatch, useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
