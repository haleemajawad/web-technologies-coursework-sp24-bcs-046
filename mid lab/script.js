
    const icon = document.getElementById("icon");
    const menu = document.getElementById("menu");
    const sapphirelogo = document.getElementById("sapphire-logo");
    const womenul = document.getElementById("womenul");
    const crossmenu = document.getElementById("crossmenu");

    icon.addEventListener("click", function () {
        menu.classList.toggle("open");
        sapphirelogo.classList.toggle("disappear");
        womenul.classList.toggle("disappear");
    });
    crossmenu.addEventListener("click", function () {
        menu.classList.remove("open");
        sapphirelogo.classList.remove("disappear");
        womenul.classList.remove("disappear");
    });


  $(document).ready(function () {

    $.ajax({
      url: "https://fakestoreapi.com/products?limit=4",
      method: "GET",
      success: function (data) {

        $(".featured").empty();
        $(".featured").append("<h2 id='featured-title'>FEATURED PRODUCTS</h2>");

        $.each(data, function (i, product) {
          var card = `
            <div class="product-card">
              <img src="${product.image}" alt="${product.title}" />
              <h4>${product.title}</h4>
              <p class="price">$${product.price}</p>
              <button class="quick-view-btn"
                data-title="${product.title}"
                data-desc="${product.description}"
                data-rating="${product.rating.rate}"
                data-reviews="${product.rating.count}"
                data-price="$${product.price}"
                data-img="${product.image}">
                QUICK VIEW
              </button>
              <button class="add-to-cart-btn" data-title="${product.title}" data-price="$${product.price}">
                ADD TO CART
              </button>
            </div>
          `;
          $(".featured").append(card);
        });

      },
      error: function () {
        $(".featured").html("<p>Could not load products.</p>");
      }
    });

    // --- Modal open ---
    $(document).on("click", ".quick-view-btn", function () {
      $("#modal-title").text($(this).data("title"));
      $("#modal-desc").text($(this).data("desc"));
      $("#modal-rating span").text($(this).data("rating") + " / 5 (" + $(this).data("reviews") + " reviews)");
      $("#modal-price").text($(this).data("price"));
      $("#modal-img").attr("src", $(this).data("img"));
      $("#quick-view-modal").fadeIn(300);
    });

    // --- Add to cart ---
    $(document).on("click", ".add-to-cart-btn", function () {
      var title = $(this).data("title");
      var price = $(this).data("price");
      alert("Added " + title + " to cart for " + price + ".");
    });

    // --- Modal close via X button ---
    $("#close-modal").on("click", function () {
      $("#quick-view-modal").fadeOut(200);
    });

    // --- Modal close by clicking dark backdrop ---
    $("#quick-view-modal").on("click", function (e) {
      if ($(e.target).is("#quick-view-modal")) {
        $(this).fadeOut(200);
      }
    });

  });

