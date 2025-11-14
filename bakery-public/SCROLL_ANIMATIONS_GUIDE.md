# Scroll Animations Guide

## How to Add Scroll Animations to Any Page

The scroll animations use the `useScrollAnimation` composable which is available globally.

### Option 1: Automatic (Easiest - Recommended)

Just add the `scroll-section` class to any section you want to animate:

```vue
<template>
  <div>
    <!-- This section will automatically animate on scroll -->
    <section class="scroll-section opacity-0 translate-y-10 transition-all duration-700">
      <h2>Your Content</h2>
      <p>This will fade in and slide up when scrolled into view</p>
    </section>

    <!-- Another animated section -->
    <section class="scroll-section opacity-0 translate-y-10 transition-all duration-700">
      <h2>More Content</h2>
      <p>This will also animate!</p>
    </section>
  </div>
</template>

<script setup>
// Import the composable
const { observeAllSections } = useScrollAnimation()

// Setup animations when component is mounted
onMounted(() => {
  if (import.meta.client) {
    observeAllSections()
  }
})
</script>
```

### Option 2: Manual Control (Advanced)

For more control, use refs to target specific elements:

```vue
<template>
  <div>
    <section ref="mySection" class="opacity-0 translate-y-10 transition-all duration-700">
      <h2>Manually Controlled Section</h2>
    </section>
  </div>
</template>

<script setup>
const mySection = ref(null)
const { observeElement } = useScrollAnimation()

onMounted(() => {
  if (import.meta.client) {
    observeElement(mySection)
  }
})
</script>
```

### Required Classes

For the animation to work, add these Tailwind classes to your section:

```
scroll-section opacity-0 translate-y-10 transition-all duration-700
```

**What each class does:**
- `scroll-section` - Marks element for auto-observation
- `opacity-0` - Starts invisible (will become opacity-100)
- `translate-y-10` - Starts 10px down (will move to translate-y-0)
- `transition-all` - Smooth transition for all properties
- `duration-700` - Animation takes 700ms

### Customization

#### Different Animation Duration

```html
<section class="scroll-section opacity-0 translate-y-10 transition-all duration-1000">
  <!-- Slower animation (1 second) -->
</section>

<section class="scroll-section opacity-0 translate-y-10 transition-all duration-300">
  <!-- Faster animation (300ms) -->
</section>
```

#### Different Slide Distance

```html
<section class="scroll-section opacity-0 translate-y-20 transition-all duration-700">
  <!-- Slides up from 20px instead of 10px -->
</section>

<section class="scroll-section opacity-0 translate-y-5 transition-all duration-700">
  <!-- Subtle 5px slide -->
</section>
```

#### Slide from Left

```html
<section class="scroll-section opacity-0 -translate-x-10 transition-all duration-700">
  <!-- Slides in from left -->
</section>
```

#### Slide from Right

```html
<section class="scroll-section opacity-0 translate-x-10 transition-all duration-700">
  <!-- Slides in from right -->
</section>
```

#### Scale Effect

```html
<section class="scroll-section opacity-0 scale-95 transition-all duration-700">
  <!-- Starts slightly smaller and scales up -->
</section>
```

When animated, the composable will add:
- `opacity-100` (visible)
- `translate-y-0` (or translate-x-0, scale-100, etc.)

### Advanced Options

#### Custom Trigger Threshold

```javascript
const { setupObserver } = useScrollAnimation()

onMounted(() => {
  if (import.meta.client) {
    // Trigger when 50% of element is visible
    setupObserver({ threshold: 0.5 })

    const sections = document.querySelectorAll('.scroll-section')
    sections.forEach(section => observer.observe(section))
  }
})
```

#### Observe Multiple Specific Elements

```vue
<script setup>
const section1 = ref(null)
const section2 = ref(null)
const section3 = ref(null)

const { observeElements } = useScrollAnimation()

onMounted(() => {
  if (import.meta.client) {
    observeElements([section1, section2, section3])
  }
})
</script>
```

### Best Practices

1. **Always wrap in `import.meta.client` check** - Prevents SSR errors
2. **Call in `onMounted`** - Ensures DOM is ready
3. **Use `scroll-section` class** - Easier than managing individual refs
4. **Keep animations subtle** - 10px movement is usually enough
5. **Use consistent timing** - 700ms duration works well for most cases

### Example: Full Page with Animations

```vue
<template>
  <div class="min-h-screen">
    <!-- Hero - No animation -->
    <section class="h-screen bg-blue-500">
      <h1>Welcome</h1>
    </section>

    <!-- Features - Animate -->
    <section class="py-16 scroll-section opacity-0 translate-y-10 transition-all duration-700">
      <h2>Features</h2>
      <div class="grid grid-cols-3 gap-4">
        <div>Feature 1</div>
        <div>Feature 2</div>
        <div>Feature 3</div>
      </div>
    </section>

    <!-- About - Animate -->
    <section class="py-16 scroll-section opacity-0 translate-y-10 transition-all duration-700">
      <h2>About Us</h2>
      <p>Our story...</p>
    </section>

    <!-- Contact - Animate -->
    <section class="py-16 scroll-section opacity-0 translate-y-10 transition-all duration-700">
      <h2>Contact</h2>
      <form>...</form>
    </section>
  </div>
</template>

<script setup>
const { observeAllSections } = useScrollAnimation()

onMounted(() => {
  if (import.meta.client) {
    observeAllSections()
  }
})
</script>
```

### Troubleshooting

**Animation not working?**

1. Check if `import.meta.client` wrapper is present
2. Verify classes are added: `scroll-section opacity-0 translate-y-10 transition-all duration-700`
3. Make sure `observeAllSections()` is called in `onMounted`
4. Check browser console for errors
5. Ensure element has some content (invisible elements won't trigger)

**Animation triggers too early/late?**

Adjust the `rootMargin` option:

```javascript
setupObserver({
  rootMargin: '0px 0px -200px 0px' // Triggers later (when closer to viewport)
})

setupObserver({
  rootMargin: '0px 0px 0px 0px' // Triggers as soon as element enters viewport
})
```

**Want animation to repeat?**

By default, animation triggers once. To make it repeat, modify the composable:

```javascript
// In useScrollAnimation.js, comment out this line:
// observer.value.unobserve(entry.target)
```

### Performance

The Intersection Observer API is highly performant and doesn't cause layout thrashing like scroll event listeners. It's safe to use on dozens of elements per page.

### Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge). Falls back gracefully in older browsers (elements just appear without animation).
