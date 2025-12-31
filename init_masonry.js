(function () {
  // Masonry instance handle (null when not initialized)
  var msnry = null;
  var grid = document.querySelector('.grid');

  // Masonry options (kept from your original script)
  var MASONRY_OPTIONS = {
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    gutter: 10,
    percentPosition: true
  };

  // Initialize Masonry only if not already initialized
  function initMasonry() {
    if (!grid) return;
    if (msnry) {
      // already initialized -> ensure layout
      msnry.layout();
      return;
    }

    msnry = new Masonry(grid, MASONRY_OPTIONS);

    // Re-layout when images load (supports imagesLoaded as global function or jQuery plugin)
    if (typeof imagesLoaded === 'function') {
      // vanilla imagesLoaded usage
      imagesLoaded(grid).on('progress', function () {
        if (msnry) msnry.layout();
      });
    } else if (window.jQuery && typeof jQuery(grid).imagesLoaded === 'function') {
      // jQuery plugin fallback (if you still use the jQuery version)
      $(grid).imagesLoaded().progress(function () {
        if (msnry) msnry.layout();
      });
    }
  }

  // Destroy Masonry if it exists
  function destroyMasonry() {
    if (msnry) {
      msnry.destroy();
      msnry = null;
    }
  }

  // Decide whether to init or destroy based on width threshold
  function updateMasonryByWidth() {
    if (window.innerWidth <= 700) {
      destroyMasonry();
    } else {
      initMasonry();
    }
  }

  // Debounced resize handler to avoid thrashing
  var resizeTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updateMasonryByWidth, 150);
  });

  // Run on initial load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateMasonryByWidth);
  } else {
    updateMasonryByWidth();
  }

  // Optional: if your grid content is added/changed dynamically you can call initMasonry()
  // or msnry.layout() from your code after DOM updates.
})();