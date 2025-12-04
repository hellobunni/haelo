/**
 * Schema.org structured data utilities for SEO
 */

export interface OrganizationSchema {
  "@context": string;
  "@type": "Organization";
  name: string;
  url: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
  contactPoint?: {
    "@type": "ContactPoint";
    contactType: string;
    email?: string;
    telephone?: string;
  };
  address?: {
    "@type": "PostalAddress";
    streetAddress?: string;
    addressLocality?: string;
    addressCountry?: string;
  };
  telephone?: string;
}

export interface PersonSchema {
  "@context": string;
  "@type": "Person";
  name: string;
  jobTitle?: string;
  url?: string;
  image?: string;
  sameAs?: string[];
  email?: string;
  worksFor?: {
    "@type": "Organization";
    name: string;
  };
}

export interface WebSiteSchema {
  "@context": string;
  "@type": "WebSite";
  name: string;
  url: string;
  description?: string;
  potentialAction?: {
    "@type": "SearchAction";
    target: {
      "@type": "EntryPoint";
      urlTemplate: string;
    };
    "query-input": string;
  };
}

export interface LocalBusinessSchema {
  "@context": string;
  "@type": "LocalBusiness";
  name: string;
  url?: string;
  logo?: string;
  description?: string;
  telephone?: string;
  email?: string;
  address?: {
    "@type": "PostalAddress";
    streetAddress?: string;
    addressLocality?: string;
    addressCountry?: string;
  };
  sameAs?: string[];
}

/**
 * Generate Organization Schema JSON-LD
 */
export function generateOrganizationSchema(options: {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  socialProfiles?: string[];
  email?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    country?: string;
  };
}): OrganizationSchema {
  const schema: OrganizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: options.name,
    url: options.url,
  };

  if (options.logo) {
    schema.logo = options.logo;
  }

  if (options.description) {
    schema.description = options.description;
  }

  if (options.socialProfiles && options.socialProfiles.length > 0) {
    schema.sameAs = options.socialProfiles;
  }

  if (options.email) {
    schema.contactPoint = {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: options.email,
    };
    if (options.phone) {
      schema.contactPoint.telephone = options.phone;
    }
  }

  if (options.phone) {
    schema.telephone = options.phone;
  }

  if (options.address) {
    schema.address = {
      "@type": "PostalAddress",
    };
    if (options.address.street) {
      schema.address.streetAddress = options.address.street;
    }
    if (options.address.city) {
      schema.address.addressLocality = options.address.city;
    }
    if (options.address.country) {
      schema.address.addressCountry = options.address.country;
    }
  }

  return schema;
}

/**
 * Generate Person Schema JSON-LD
 */
export function generatePersonSchema(options: {
  name: string;
  jobTitle?: string;
  url?: string;
  image?: string;
  socialProfiles?: string[];
  email?: string;
  worksFor?: {
    name: string;
    url: string;
  };
}): PersonSchema {
  const schema: PersonSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: options.name,
  };

  if (options.jobTitle) {
    schema.jobTitle = options.jobTitle;
  }

  if (options.url) {
    schema.url = options.url;
  }

  if (options.image) {
    schema.image = options.image;
  }

  if (options.socialProfiles && options.socialProfiles.length > 0) {
    schema.sameAs = options.socialProfiles;
  }

  if (options.email) {
    schema.email = options.email;
  }

  if (options.worksFor) {
    schema.worksFor = {
      "@type": "Organization",
      name: options.worksFor.name,
    };
  }

  return schema;
}

/**
 * Generate WebSite Schema JSON-LD
 */
export function generateWebSiteSchema(options: {
  name: string;
  url: string;
  description?: string;
  searchUrl?: string;
}): WebSiteSchema {
  const schema: WebSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: options.name,
    url: options.url,
  };

  if (options.description) {
    schema.description = options.description;
  }

  if (options.searchUrl) {
    schema.potentialAction = {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: options.searchUrl,
      },
      "query-input": "required name=search_term_string",
    };
  }

  return schema;
}

/**
 * Generate LocalBusiness Schema JSON-LD
 */
export function generateLocalBusinessSchema(options: {
  name: string;
  url?: string;
  logo?: string;
  description?: string;
  telephone?: string;
  email?: string;
  address?: {
    street?: string;
    city?: string;
    country?: string;
  };
  socialProfiles?: string[];
}): LocalBusinessSchema {
  const schema: LocalBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: options.name,
  };

  if (options.url) {
    schema.url = options.url;
  }

  if (options.logo) {
    schema.logo = options.logo;
  }

  if (options.description) {
    schema.description = options.description;
  }

  if (options.telephone) {
    schema.telephone = options.telephone;
  }

  if (options.email) {
    schema.email = options.email;
  }

  if (options.address) {
    schema.address = {
      "@type": "PostalAddress",
    };
    if (options.address.street) {
      schema.address.streetAddress = options.address.street;
    }
    if (options.address.city) {
      schema.address.addressLocality = options.address.city;
    }
    if (options.address.country) {
      schema.address.addressCountry = options.address.country;
    }
  }

  if (options.socialProfiles && options.socialProfiles.length > 0) {
    schema.sameAs = options.socialProfiles;
  }

  return schema;
}

/**
 * Render JSON-LD script tag content
 */
export function renderJsonLdScript(schema: object): string {
  return JSON.stringify(schema, null, 2);
}
