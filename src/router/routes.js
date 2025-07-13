const routes = [
  {
    path: '/',
    component: () => import('pages/Auth/LoginPage.vue'),
  },
  {
    path: '/login',
    component: () => import('pages/Auth/LoginPage.vue'),
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('pages/IndexPage.vue'),
        meta: {
          label: 'Dashboard',
          icon: 'dashboard',
          showInSidebar: true,
        },
      },
      {
        path: '/manage-users',
        name: 'manage-users',
        component: () => import('pages/ManagerUsers.vue'),
        meta: {
          label: 'Manage Users',
          icon: 'fa-solid fa-list-check',
          showInSidebar: true,
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
