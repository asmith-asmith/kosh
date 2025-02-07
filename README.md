This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# Cur ERD
# Restaurant Guide Database Schema

## Tables and Relationships

## 1. Restaurants
- **id**: `SERIAL PRIMARY KEY`
- **name**: `VARCHAR(255) NOT NULL`
- **phone**: `VARCHAR(20) NULLABLE`
- **address**: `TEXT NOT NULL`
- **location_id**: `INTEGER NOT NULL` (Foreign Key → `Locations.id`)
- **category_id**: `INTEGER NOT NULL` (Foreign Key → `Categories.id`)
- **website**: `TEXT NULLABLE`
- **social_media**: `JSONB NULLABLE` (For storing dynamic social media links)
- **created_at**: `TIMESTAMP DEFAULT NOW()`
- **updated_at**: `TIMESTAMP DEFAULT NOW() ON UPDATE`

### Relationships:
- Belongs to: `Locations`, `Categories`
- Has many: `Reviews`, `Photos`, `SocialMediaLinks`, `BlogPosts`
- Has one: `Ratings` (Optional)

---

## 2. Locations
- **id**: `SERIAL PRIMARY KEY`
- **neighborhood**: `VARCHAR(100) NOT NULL`
- **city**: `VARCHAR(100) NOT NULL` 
- **state**: `VARCHAR(50) NOT NULL`
- **country**: `VARCHAR(50) NOT NULL`

### Relationships:
- Has many: `Restaurants`

---

## 3. Categories
- **id**: `SERIAL PRIMARY KEY`
- **name**: `VARCHAR(50) NOT NULL`

### Relationships:
- Has many: `Restaurants`

---

## 4. Reviews
- **id**: `SERIAL PRIMARY KEY`
- **restaurant_id**: `INTEGER NOT NULL` (Foreign Key → `Restaurants.id`)
- **user_id**: `INTEGER NOT NULL` (Foreign Key → `Users.id`)
- **rating**: `SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5)`
- **comment**: `TEXT NULLABLE`
- **created_at**: `TIMESTAMP DEFAULT NOW()`

### Relationships:
- Belongs to: `Restaurants`, `Users`

---

## 5. Users
- **id**: `SERIAL PRIMARY KEY`
- **name**: `VARCHAR(100) NOT NULL`
- **email**: `VARCHAR(255) UNIQUE NOT NULL`
- **password**: `TEXT NOT NULL`
- **profile_picture**: `TEXT NULLABLE`

### Relationships:
- Has many: `Reviews`, `Favorites`, `BlogPosts`

---

## 6. Ratings (Optional)
- **id**: `SERIAL PRIMARY KEY`
- **restaurant_id**: `INTEGER NOT NULL UNIQUE` (Foreign Key → `Restaurants.id`)
- **average_rating**: `DECIMAL(3, 2) DEFAULT 0.0 NOT NULL`
- **total_reviews**: `INTEGER DEFAULT 0 NOT NULL`

### Relationships:
- Belongs to: `Restaurants`

---

## 7. SocialMediaLinks
- **id**: `SERIAL PRIMARY KEY`
- **restaurant_id**: `INTEGER NOT NULL` (Foreign Key → `Restaurants.id`)
- **platform**: `VARCHAR(50) NOT NULL` (e.g., "Instagram", "TikTok")
- **url**: `TEXT NOT NULL`
- **created_at**: `TIMESTAMP DEFAULT NOW()`

### Relationships:
- Belongs to: `Restaurants`

---

## 8. Photos
- **id**: `SERIAL PRIMARY KEY`
- **restaurant_id**: `INTEGER NOT NULL` (Foreign Key → `Restaurants.id`)
- **url**: `TEXT NOT NULL`
- **description**: `TEXT NULLABLE`
- **uploaded_at**: `TIMESTAMP DEFAULT NOW()`

### Relationships:
- Belongs to: `Restaurants`

---

## 9. Favorites
- **id**: `SERIAL PRIMARY KEY`
- **user_id**: `INTEGER NOT NULL` (Foreign Key → `Users.id`)
- **restaurant_id**: `INTEGER NOT NULL` (Foreign Key → `Restaurants.id`)
- **created_at**: `TIMESTAMP DEFAULT NOW()`

### Relationships:
- Belongs to: `Users`, `Restaurants`

---

## 10. BlogPosts
- **id**: `SERIAL PRIMARY KEY`
- **user_id**: `INTEGER NOT NULL` (Foreign Key → `Users.id`)
- **restaurant_id**: `INTEGER NULLABLE` (Foreign Key → `Restaurants.id`) *(Optional for restaurant-related blogs)*
- **title**: `TEXT NOT NULL`
- **slug**: `TEXT UNIQUE NOT NULL`
- **content**: `TEXT NOT NULL` (Markdown format)
- **thumbnail_url**: `TEXT NULLABLE`
- **tags**: `JSONB NULLABLE` (For storing tags dynamically)
- **created_at**: `TIMESTAMP DEFAULT NOW()`
- **updated_at**: `TIMESTAMP DEFAULT NOW() ON UPDATE`
- **is_published**: `BOOLEAN DEFAULT FALSE`

### Relationships:
- Belongs to: `Users`
- Optional belongs to: `Restaurants`

---

## 11. BlogTags (Optional)
- **id**: `SERIAL PRIMARY KEY`
- **name**: `VARCHAR(50) UNIQUE NOT NULL`

---

## 12. PostTags (Optional)
- **id**: `SERIAL PRIMARY KEY`
- **post_id**: `INTEGER NOT NULL` (Foreign Key → `BlogPosts.id`)
- **tag_id**: `INTEGER NOT NULL` (Foreign Key → `BlogTags.id`)

---

### Relationships Summary:
- **Restaurants → BlogPosts**: One-to-Many (Optional)
- **Users → BlogPosts**: One-to-Many
- **BlogPosts → BlogTags**: Many-to-Many (Optional)

---

### Usage Example for BlogPosts:
1. **Admin writes a blog**:
   - Writes Markdown content for a blog in a rich text editor.
   - Saves it to `BlogPosts.content` as raw Markdown.
2. **Frontend renders the blog**:
   - Fetches the Markdown from `BlogPosts.content`.
   - Converts Markdown to HTML using a library like `marked` or `remark`.
3. **Display**:
   - HTML is rendered in the blog section of the site.