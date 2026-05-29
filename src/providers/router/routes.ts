import { createElement, lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'

const MainPage = lazy(() =>
  import('@/pages/mainPage').then((module) => ({ default: module.MainPage })),
)

const CategoriesPage = lazy(() =>
  import('@/pages/categoriesPage').then((module) => ({
    default: module.CategoriesPage,
  })),
)

const ExploreEventsInYerevanPage = lazy(() =>
  import('@/pages/explore-events-in-yerevan').then((module) => ({
    default: module.ExploreEventsInYerevanPage,
  })),
)

const LoginPage = lazy(() =>
  import('@/pages/LoginPage').then((module) => ({ default: module.LoginPage })),
)

const SignUpPage = lazy(() =>
  import('@/pages/SignUpPage').then((module) => ({ default: module.SignUpPage })),
)

const AdminPage = lazy(() =>
  import('@/pages/adminPage').then((module) => ({ default: module.AdminPage })),
)

const PasswordRecoveryPage = lazy(() =>
  import('@/pages/passwordRecovery').then((module) => ({
    default: module.PasswordRecoveryPage,
  })),
)

const UserProfilePage = lazy(() =>
  import('@/pages/userProfile').then((module) => ({
    default: module.UserProfilePage,
  })),
)

const NotFoundPage = lazy(() =>
  import('@/pages/404page').then((module) => ({ default: module.NotFoundPage })),
)

export const mainPageRoute: RouteObject = {
  index: true,
  element: createElement(MainPage),
}

export const categoriesPageRoute: RouteObject = {
  path: 'categories',
  element: createElement(CategoriesPage),
}

export const exploreEventsPageRoute: RouteObject = {
  path: 'explore-events',
  element: createElement(ExploreEventsInYerevanPage),
}

export const loginPageRoute: RouteObject = {
  path: 'login',
  element: createElement(LoginPage),
}

export const signUpPageRoute: RouteObject = {
  path: 'sign-up',
  element: createElement(SignUpPage),
}

export const adminPageRoute: RouteObject = {
  path: 'admin',
  element: createElement(AdminPage),
}

export const passwordRecoveryPageRoute: RouteObject = {
  path: 'password-recovery',
  element: createElement(PasswordRecoveryPage),
}

export const userProfilePageRoute: RouteObject = {
  path: 'profile',
  element: createElement(UserProfilePage),
}

export const notFoundPageRoute: RouteObject = {
  path: '*',
  element: createElement(NotFoundPage),
}

export const appRoutes: RouteObject[] = [
  {
    element: createElement(AppLayout),
    children: [
      mainPageRoute,
      exploreEventsPageRoute,
      categoriesPageRoute,
      loginPageRoute,
      signUpPageRoute,
      adminPageRoute,
      passwordRecoveryPageRoute,
      userProfilePageRoute,
      notFoundPageRoute,
    ],
  },
]
