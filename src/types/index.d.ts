export type SiteConfig = {
    name: string
    description: string
    url: string
    ogImage: string
    links: {
      twitter: string
      github: string
    }
  }

  export type MarketingConfig = {
    mainNav: MainNavItem[]
  }

  export type NavItem = {
    title: string
    href: string
    disabled?: boolean
  }

  export type LoginErrorResponse = {
    success: boolean;
    message?: string; // Optional because it's only present in case of an error
  }
  
  export type MainNavItem = NavItem


