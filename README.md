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

### 1. Restaurants
- **id**: `SERIAL` (Primary Key)
- **name**: `VARCHAR(255)` (NOT NULL)
- **phone**: `VARCHAR(20)` (NULLABLE)
- **address**: `TEXT` (NOT NULL)
- **location_id**: `INTEGER` (Foreign Key → Locations.id, NOT NULL)
- **category_id**: `INTEGER` (Foreign Key → Categories.id, NOT NULL)
- **website**: `TEXT` (NULLABLE)
- **social_media**: `JSONB` (Optional, for storing links dynamically)
- **created_at**: `TIMESTAMP` (DEFAULT `NOW()`)
- **updated_at**: `TIMESTAMP` (DEFAULT `NOW()` ON UPDATE)

**Relationships**:
- Belongs to: `Locations`, `Categories`
- Has many: `Reviews`, `Photos`, `SocialMediaLinks`
- Has one: `Ratings` (Optional)

---

### 2. Locations
- **id**: `SERIAL` (Primary Key)
- **city**: `VARCHAR(100)` (NOT NULL)
- **state**: `VARCHAR(50)` (NOT NULL)
- **country**: `VARCHAR(50)` (NOT NULL)

**Relationships**:
- Has many: `Restaurants`

---

### 3. Categories
- **id**: `SERIAL` (Primary Key)
- **name**: `VARCHAR(50)` (NOT NULL)

**Relationships**:
- Has many: `Restaurants`

---

### 4. Reviews
- **id**: `SERIAL` (Primary Key)
- **restaurant_id**: `INTEGER` (Foreign Key → Restaurants.id, NOT NULL)
- **user_id**: `INTEGER` (Foreign Key → Users.id, NOT NULL)
- **rating**: `SMALLINT` (CHECK `rating BETWEEN 1 AND 5`, NOT NULL)
- **comment**: `TEXT` (NULLABLE)
- **created_at**: `TIMESTAMP` (DEFAULT `NOW()`)

**Relationships**:
- Belongs to: `Restaurants`, `Users`

---

### 5. Users
- **id**: `SERIAL` (Primary Key)
- **name**: `VARCHAR(100)` (NOT NULL)
- **email**: `VARCHAR(255)` (UNIQUE, NOT NULL)
- **password**: `TEXT` (NOT NULL)
- **profile_picture**: `TEXT` (NULLABLE)

**Relationships**:
- Has many: `Reviews`, `Favorites`

---

### 6. Ratings (Optional)
- **id**: `SERIAL` (Primary Key)
- **restaurant_id**: `INTEGER` (Foreign Key → Restaurants.id, NOT NULL, UNIQUE)
- **average_rating**: `DECIMAL(3, 2)` (DEFAULT `0.0`, NOT NULL)
- **total_reviews**: `INTEGER` (DEFAULT `0`, NOT NULL)

**Relationships**:
- Belongs to: `Restaurants`

---

### 7. SocialMediaLinks
- **id**: `SERIAL` (Primary Key)
- **restaurant_id**: `INTEGER` (Foreign Key → Restaurants.id, NOT NULL)
- **platform**: `VARCHAR(50)` (NOT NULL, e.g., "Instagram", "TikTok")
- **url**: `TEXT` (NOT NULL)
- **created_at**: `TIMESTAMP` (DEFAULT `NOW()`)

**Relationships**:
- Belongs to: `Restaurants`

---

### 8. Photos
- **id**: `SERIAL` (Primary Key)
- **restaurant_id**: `INTEGER` (Foreign Key → Restaurants.id, NOT NULL)
- **url**: `TEXT` (NOT NULL)
- **description**: `TEXT` (NULLABLE)
- **uploaded_at**: `TIMESTAMP` (DEFAULT `NOW()`)

**Relationships**:
- Belongs to: `Restaurants`

---

### 9. Favorites
- **id**: `SERIAL` (Primary Key)
- **user_id**: `INTEGER` (Foreign Key → Users.id, NOT NULL)
- **restaurant_id**: `INTEGER` (Foreign Key → Restaurants.id, NOT NULL)
- **created_at**: `TIMESTAMP` (DEFAULT `NOW()`)

**Relationships**:
- Belongs to: `Users`, `Restaurants`

---

## Relationships Summary
1. **Restaurants → Locations**: Many-to-One
2. **Restaurants → Categories**: Many-to-One
3. **Restaurants → Reviews**: One-to-Many
4. **Restaurants → SocialMediaLinks**: One-to-Many
5. **Restaurants → Ratings**: One-to-One (Optional)
6. **Restaurants → Photos**: One-to-Many
7. **Users → Reviews**: One-to-Many
8. **Users → Favorites → Restaurants**: Many-to-Many

---

Let me know if you need SQL scripts for this setup or further refinements! 😊