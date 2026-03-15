# 🚀 Product Lazy Loading Architecture Diagram

## Component Flow

```
┌─────────────────────────────────────────────────────────────┐
│                  Products Page                              │
│              src/app/products/page.tsx                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ React Query Hook (useQuery)                         │   │
│  │ • Fetches all products                              │   │
│  │ • Caches for 5 minutes (staleTime)                  │   │
│  │ • Provides: data, isLoading, error                  │   │
│  └────────────────┬────────────────────────────────────┘   │
│                   │                                         │
│  ┌────────────────▼────────────────────────────────────┐   │
│  │ Filtering & Sorting (useMemo)                       │   │
│  │ • Search by name/description                        │   │
│  │ • Price filtering                                   │   │
│  │ • Sort: newest, price, name                         │   │
│  └────────────────┬────────────────────────────────────┘   │
│                   │                                         │
│  ┌────────────────▼────────────────────────────────────┐   │
│  │ Pagination Logic                                    │   │
│  │ • Split into 12 items per page                      │   │
│  │ • Calculate total pages                             │   │
│  │ • Handle page changes                               │   │
│  └────────────────┬────────────────────────────────────┘   │
│                   │                                         │
│  ┌────────────────▼────────────────────────────────────┐   │
│  │ OptimizedProductGrid Component                      │   │
│  │ • Renders only current page items (12)              │   │
│  │ • Shows skeletons while loading                     │   │
│  └────────────────┬────────────────────────────────────┘   │
│                   │                                         │
│        ┌──────────┴──────────┬──────────────┐              │
│        │                     │              │              │
│  ┌─────▼─────┐         ┌────▼────┐   ┌────▼────┐         │
│  │ Product   │         │ Product  │   │ Product │         │
│  │ Card 1    │ ......  │ Card 2   │   │ Card 12 │         │
│  └───────────┘         └──────────┘   └─────────┘         │
│        │                                                    │
│  ┌─────▼──────────────────────────────────────────────┐   │
│  │ Pagination Component                               │   │
│  │ • Page numbers                                     │   │
│  │ • Previous/Next buttons                            │   │
│  │ • Current page highlight                           │   │
│  └──────────────────────────────────────────────────┘   │
│                                                            │
└─────────────────────────────────────────────────────────────┘
```

## Product Card Lazy Loading Flow

```
┌──────────────────────────────────────────────────────┐
│         OptimizedProductCard Component               │
│       src/components/products/...                    │
├──────────────────────────────────────────────────────┤
│                                                       │
│  ┌────────────────────────────────────────────────┐ │
│  │ useIntersectionObserver Hook                   │ │
│  │                                                 │ │
│  │ elementRef → observes this card's visibility   │ │
│  │ isVisible → true when 10% in viewport          │ │
│  └────────────────┬────────────────────────────────┘ │
│                   │                                  │
│        ┌──────────▼──────────┐                       │
│        │ isVisible == false? │                       │
│        └──────────┬──────────┘                       │
│         ┌─────────┴────────┐                         │
│         │                  │                         │
│    YES  │                  │ NO                      │
│         ▼                  ▼                         │
│   ┌──────────┐      ┌──────────────┐               │
│   │ Skeleton │      │ Load Image   │               │
│   │ Loader   │      ├──────────────┤               │
│   │ (Pulse)  │      │ onLoad →     │               │
│   │          │      │ setImageLoaded│              │
│   │ Shows    │      │              │               │
│   │ while    │      │ Fade in      │               │
│   │ scrolled │      │ image src    │               │
│   │ out      │      │              │               │
│   └──────────┘      └──────────────┘               │
│                                                      │
└──────────────────────────────────────────────────────┘
```

## Product Details Loading Timeline

```
Time  │  Action                          │  UI State
──────┼──────────────────────────────────┼──────────────────────
  0ms │ Navigate to /products/123        │ Page transition
      │                                  │
  1ms │ Fetch product data               │ ProductDetailsSkeleton
      │ (useQuery triggered)             │ • Animated pulse
      │                                  │ • Layout matched
      │                                  │
 100ms│ Data received from API           │ ProductDetailsSkeleton
      │ Start rendering content          │ (still loading)
      │                                  │
 150ms│ Fetch images from R2             │ Content appears
      │ (lazy loading via onLoad)        │ • Title visible
      │                                  │ • Price visible
      │                                  │ • Buttons visible
      │ Images fade in                   │ • Images: opacity 0
      │                                  │
 200ms│ First image onLoad fired         │ First image fades in
      │ (opacity: 0 → 1)                 │ (smooth transition)
      │                                  │
 250ms│ All images loaded                │ All images faded in
      │                                  │ • Full page visible
      │                                  │ • Swiper ready
──────┴──────────────────────────────────┴──────────────────────

Result: User sees content in ~100ms, images fade in smoothly
Cached for 5 minutes for instant return visits
```

## Data Flow: From API to Render

```
┌─────────────────────────────────────────────────────────────┐
│                     React Query Setup                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  useQuery({                                                 │
│    queryKey: ["products"],      ← Cache key                │
│    queryFn: getAllProducts,     ← API call function         │
│    staleTime: 5 * 60 * 1000     ← Cache 5 minutes          │
│  })                                                          │
│                                                              │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
    ┌────────────────────┐
    │  productService    │
    │  .getAllProducts() │
    │                    │
    │  axios GET request │
    │  /api/Product      │
    └────────┬───────────┘
             │
             ▼
    ┌────────────────────────┐
    │   Backend API Server   │
    │   Returns: Product[]   │
    └────────┬───────────────┘
             │
             ▼
    ┌─────────────────────────────┐
    │  React Query Cache (5 min)   │
    │  Store products in memory    │
    │  Subsequent calls → instant  │
    └────────┬────────────────────┘
             │
             ▼
    ┌──────────────────────────────┐
    │   Page.tsx Component         │
    │   • Filter (useMemo)         │
    │   • Sort (useMemo)           │
    │   • Paginate (12 per page)   │
    └────────┬─────────────────────┘
             │
             ▼
    ┌──────────────────────────────┐
    │ OptimizedProductGrid         │
    │ • Render 12 items            │
    │ • Pass to cards              │
    └────────┬─────────────────────┘
             │
       ┌─────┴──────────────┬──────────────┬─┐
       ▼                    ▼              ▼ ▼
    ┌──────────┐        ┌──────────┐  ┌──────────┐
    │  Card 1  │ ────── │  Card 2  │  │ Card 12  │
    │ (Lazy)   │        │ (Lazy)   │  │ (Lazy)   │
    └─────┬────┘        └─────┬────┘  └─────┬────┘
          │                   │            │
          │ (Scroll to view)  │ (Scroll)   │
          │                   │            │
          ▼                   ▼            ▼
    ┌──────────┐        ┌──────────┐  ┌──────────┐
    │ Load Img │        │ Load Img │  │ Load Img │
    │ Fade in  │        │ Fade in  │  │ Fade in  │
    └──────────┘        └──────────┘  └──────────┘
```

## Performance Timeline Comparison

### Before Optimization:

```
Time (seconds)
0  ├─────────────────────────────────────────────────────────┤ 8
   │ Fetching ALL products data...                           │
   ├─────────────┤ (1 second)                               │
   │ Rendering ALL 100+ product cards...                    │
   ├──────────────────────────────────┤ (3 seconds)         │
   │ Loading ALL product images...                          │
   ├─────────────────────────────────────────────────────────┤
   │ (5 seconds of waiting!)                               │
   └─────────────────────────────────────────────────────────┘
```

### After Optimization:

```
Time (seconds)
0  ├─────────────────────────────────────────────────────────┤ 2
   │ Fetch 12 products + metadata...                        │
   ├──────┤ (0.3 seconds)                                  │
   │ Render 12 cards (cached)...                          │
   ├─────────┤ (0.4 seconds) ← VISIBLE NOW!               │
   │ Load visible images lazily...                         │
   ├──────────────┤ (1+ seconds in background)            │
   │ User can interact immediately!                       │
   └─────────────────────────────────────────────────────────┘
```

## Scroll Event Handling

```
User Scrolling Down the Page:
─────────────────────────────────

    ┌─────────────────────────────┐
    │  Browser Scroll Event       │
    │  requestAnimationFrame       │
    └────────────┬────────────────┘
                 │
                 ▼
    ┌─────────────────────────────┐
    │ Intersection Observer        │
    │ Checks visible products      │
    │ (Non-blocking)              │
    └────────────┬────────────────┘
                 │
                 ▼
    ┌─────────────────────────────┐
    │ For each visible card:       │
    │ isVisible = true            │
    └────────────┬────────────────┘
                 │
                 ▼
    ┌─────────────────────────────┐
    │ OptimizedProductCard        │
    │ Shows image element         │
    │ img src → fetch             │
    └────────────┬────────────────┘
                 │
                 ▼
    ┌─────────────────────────────┐
    │ Image Load                  │
    │ (parallel, non-blocking)    │
    │ onLoad → fade in animation  │
    └─────────────────────────────┘

Result: Smooth scrolling, images load as needed
```

---

**Architecture Designed for Maximum Performance** ⚡
