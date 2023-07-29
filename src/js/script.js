jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる
  // ハンバーガーメニュー
  $(function () {
    $(".js-hamburger").click(function () {
      $(this).toggleClass("is-open");
      if ($(this).hasClass("is-open")) {
        openDrawer();
      } else {
        closeDrawer();
      }
    });

    //backgroundまたはページ内リンクをクリックで閉じる
    $(".js-drawer a[href]").on("click", function (event) {
      closeDrawer();
    });

    //resizeイベント
    $(window).resize(function () {
      if (window.matchMedia("(min-width: 768px)").matches) {
        closeDrawer();
      }
    });
  });

  function openDrawer() {
    $(".js-drawer").fadeIn();
    $(".js-hamburger").addClass("is-open");
  }

  function closeDrawer() {
    $(".js-drawer").fadeOut();
    $(".js-hamburger").removeClass("is-open");
  }

  // swiper
  //  メインビューのswiper
  let swipeOption = {
    loop: true, // スライダーをループさせる設定
    effect: "slide", // フェードさせる為の設定
    fadeEffect: {
      crossFade: true, //縦横比が統一されない画像の場合、重なる場合がある為、それを防ぐ設定
    },
    autoplay: {
      delay: 4000, // 秒後に次の画像にいくようにする設定
      disableOnInteraction: false, // ユーザーが操作後、自動再生を再開する設定
    },
    speed: 1000, // 2秒かけ次の画像へ移動させる設定
    allowTouchMove: false, // マウスでのスワイプを禁止する設定
  };
  new Swiper(".js-fv-swiper", swipeOption);

  // campaign swiper
  let mySwiper = new Swiper(".js-top-campaign-swiper", {
    // 以下にオプションを設定
    loop: true, //最後に達したら先頭に戻る
    slidesPerView: 1.25,
    spaceBetween: 24,
    allowTouchMove: true,
    //ページネーション表示の設定
    pagination: {
      el: ".swiper-pagination", //ページネーションの要素
      type: "bullets", //ページネーションの種類
      clickable: true, //クリックに反応させる
    },

    //ナビゲーションボタン（矢印）表示の設定
    navigation: {
      nextEl: ".swiper-button-next", //「次へボタン」要素の指定
      prevEl: ".swiper-button-prev", //「前へボタン」要素の指定
    },

    //スクロールバー表示の設定
    scrollbar: {
      el: ".swiper-scrollbar", //要素の指定
    },
    breakpoints: {
      // ブレークポイント
      600: {
        // 画面幅600px以上で適用
        slidesPerView: 1.5,
      },
      1025: {
        // 画面幅1025px以上で適用
        slidesPerView: 3.5,
        spaceBetween: 40,
      },
    },
  });
});
