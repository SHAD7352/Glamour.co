# 🔧 Troubleshooting & FAQ

## Common Issues & Solutions

### Issue 1: Images Not Loading ❌

**Problem**: Product images show as broken or don't appear

**Solutions**:

1. Check browser console (F12) for errors
2. Verify R2_PUBLIC_DOMAIN environment variable:
   ```bash
   echo $NEXT_PUBLIC_R2_DOMAIN  # Should show your R2 domain
   ```
3. Check image URLs in network tab (F12 → Network)
4. Verify image paths in database are correct
5. Test with `curl` from terminal:
   ```bash
   curl -I https://your-r2-domain/image-path
   ```

**Quick Fix**:

- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+Shift+R)
- Check that R2 bucket is public

---

### Issue 2: Pagination Not Working ❌

**Problem**: Pagination buttons don't change pages or show wrong items

**Solutions**:

1. Check `ITEMS_PER_PAGE` value (should be 12):
   ```typescript
   // src/app/products/page.tsx, line ~20
   const ITEMS_PER_PAGE = 12;
   ```
2. Verify pagination state management:
   - Does `currentPage` update on button click?
   - Does URL update when page changes?
3. Check total products count:
   - Open DevTools → Check products array length
   - Verify `totalPages` calculation is correct

**Quick Debug**:

```javascript
// In browser console
// Check current page state
const urlParams = new URLSearchParams(window.location.search);
console.log("Current page:", urlParams.get("page"));

// Check products in React DevTools
```

---

### Issue 3: Slow Page Load (Still) 🐌

**Problem**: Page still loads slowly even with optimizations

**Solutions**:

1. **Check Network Tab**:

   ```
   F12 → Network → Refresh
   Look for:
   - API requests taking >2s? → Backend issue
   - Images large (>500KB)? → Need image optimization
   - Too many requests? → Check query waterfall
   ```

2. **Reduce Items Per Page**:

   ```typescript
   // src/app/products/page.tsx
   const ITEMS_PER_PAGE = 6; // Reduce from 12
   ```

3. **Enable Compression** (Backend):
   - Ask backend team to enable gzip compression
   - Should reduce API response by ~70%

4. **Optimize Images** (Backend):
   - Ask backend to compress images
   - Target: <200KB per image
   - Format: WebP or optimized JPEG

5. **Clear Cache**:
   - Reduce staleTime to 1 minute:
   ```typescript
   staleTime: 1 * 60 * 1000, // 1 minute instead of 5
   ```

---

### Issue 4: Images Load Too Late ⏱️

**Problem**: Images take too long to appear while scrolling

**Solutions**:

1. **Increase Intersection Threshold**:

   ```typescript
   // src/hooks/useIntersectionObserver.ts
   // Load earlier (further before entering viewport)
   threshold: 0.5, // Load when 50% about to be visible
   ```

2. **Enable Image Prefetching**:
   - If backend supports: ask for image URL prefetch
   - Or use Next.js Image Prefetching

3. **Reduce Image Quality**:
   - Load smaller thumbnail first
   - Then upgrade to full quality
   - Requires backend support

4. **Check Network Speed**:
   - DevTools → Network → Throttle to "4G"
   - Is performance still acceptable?
   - If not, may need backend image optimization

---

### Issue 5: Pagination Reset on Filter ❌

**Problem**: Page number resets to 1 when searching/sorting

**Expected Behavior**: This is CORRECT! ✅

- When you filter, results change
- Page 1 should show new filtered results
- This is standard UX pattern

---

### Issue 6: Skeleton Loader Won't Appear ❌

**Problem**: No skeleton loader shown while loading

**Solutions**:

1. **Check Loading State**:

   ```typescript
   // Add to page.tsx to debug
   console.log("isLoading:", isLoading);
   console.log("data:", data);
   ```

2. **Verify Skeleton Component**:
   - Check ProductDetailsSkeleton.tsx exists
   - Check ProductSkeleton.tsx exists
   - Run: `npm list @shadcn/ui` (verify UI library)

3. **Check React Query Setup**:
   - Verify QueryProvider wraps app
   - Check src/app/providers.tsx

---

### Issue 7: Products Load All at Once ❌

**Problem**: All products load instead of paginating

**Check**:

1. Verify `ITEMS_PER_PAGE` is set
2. Check pagination logic in useMemo:
   ```typescript
   const paginatedProducts = useMemo(() => {
     const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
     const endIndex = startIndex + ITEMS_PER_PAGE;
     return filteredAndSortedProducts.slice(startIndex, endIndex);
   }, [filteredAndSortedProducts, currentPage]);
   ```
3. Verify OptimizedProductGrid receives correct props

---

### Issue 8: High Memory Usage ❌

**Problem**: Browser memory increases over time

**Solutions**:

1. **Check for Memory Leaks**:
   - DevTools → Memory → Take heap snapshot
   - Compare before/after navigation
   - Look for growing arrays

2. **Reduce Cache Duration**:

   ```typescript
   staleTime: 2 * 60 * 1000, // 2 minutes instead of 5
   gcTime: 3 * 60 * 1000,    // 3 minutes garbage collection
   ```

3. **Limit Stored Products**:
   - Server-side pagination from backend
   - Only cache current page data

---

## Performance Checklist ✅

Before declaring complete, verify:

- [ ] Products page loads in <2 seconds
- [ ] Pagination buttons work
- [ ] Scrolling is smooth (60 FPS)
- [ ] Images load lazily (check Network tab)
- [ ] Product details load with skeleton first
- [ ] No console errors
- [ ] Mobile responsive (test on mobile)
- [ ] Dark mode works
- [ ] Search/sort work correctly
- [ ] Admin actions (edit/delete) work
- [ ] Cart functionality works
- [ ] Going back from details is instant (cached)

---

## Browser Support

| Feature               | Chrome | Firefox | Safari | Edge |
| --------------------- | ------ | ------- | ------ | ---- |
| Intersection Observer | 51+    | 55+     | 12.1+  | 15+  |
| Lazy Loading          | 77+    | 75+     | 15.1+  | 79+  |
| Async/Await           | 55+    | 52+     | 10.1+  | 15+  |

**Fallback**: Older browsers still work, just without lazy loading optimization

---

## Performance Testing Tools

### 1. **Chrome DevTools** (Built-in)

```
F12 → Network Tab → Throttle to "Slow 3G"
Refresh and watch load times
```

### 2. **Lighthouse** (Built-in)

```
F12 → Lighthouse → Generate report
Check Performance score
```

### 3. **WebPageTest** (Online)

```
https://www.webpagetest.org/
Upload your site URL
Get detailed waterfall chart
```

### 4. **GTmetrix** (Online)

```
https://gtmetrix.com/
Analyze performance
Get optimization suggestions
```

---

## Debug Mode

Add this to enable verbose logging:

```typescript
// src/app/products/page.tsx
const DEBUG = true; // Set to false in production

if (DEBUG) {
  useEffect(() => {
    console.log("Products:", products);
    console.log("Current Page:", currentPage);
    console.log("Paginated Products:", paginatedProducts);
  }, [products, currentPage, paginatedProducts]);
}
```

---

## Common Error Messages

### "Failed to fetch products"

- Backend API down
- Network error
- CORS issue
- Check browser console for details

### "Product not found"

- Product ID doesn't exist
- Product deleted
- Wrong API endpoint

### "Image failed to load"

- Wrong R2 domain
- Image doesn't exist in storage
- Storage permissions issue
- Network error

### "Cannot find module..."

- Missing file
- Typo in import path
- Run: `npm install`

---

## Getting Help

If you encounter issues:

1. **Check Console** (F12):
   - Look for red error messages
   - Copy exact error text

2. **Check Network** (F12 → Network):
   - Look for 404, 500 errors
   - Check response times
   - Verify URL paths

3. **Enable Debug Mode**:
   - Add console.log statements
   - Check values are correct

4. **Rebuild Project**:

   ```bash
   npm run build
   npm run dev
   ```

5. **Clear Cache**:
   ```bash
   npm cache clean --force
   rm -rf .next
   npm install
   npm run dev
   ```

---

## Performance Tips 💡

1. **Don't Load All Products**: Use pagination ✅
2. **Lazy Load Images**: Scroll-based loading ✅
3. **Cache Results**: 5-minute cache ✅
4. **Show Skeletons**: Better perceived speed ✅
5. **Optimize Backend**: Ask backend team to:
   - Enable gzip compression
   - Compress images
   - Add pagination
   - Add caching headers

---

## Questions?

Refer to:

- [LAZY_LOADING_OPTIMIZATION.md](LAZY_LOADING_OPTIMIZATION.md) - Full docs
- [PERFORMANCE_SUMMARY.md](PERFORMANCE_SUMMARY.md) - Quick overview
- [ARCHITECTURE_DIAGRAMS.md](ARCHITECTURE_DIAGRAMS.md) - How it works

---

**Last Updated**: March 15, 2026
**Status**: ✅ Optimized & Ready to Use
