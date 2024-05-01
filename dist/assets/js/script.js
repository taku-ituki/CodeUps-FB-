"use strict";

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
    $(".js-header").addClass("is-open");
    $(".js-hamburger").addClass("is-open");
  }
  function closeDrawer() {
    $(".js-drawer").fadeOut();
    $(".js-header").removeClass("is-open");
    $(".js-hamburger").removeClass("is-open");
  }

  // swiper
  //  メインビューのswiper
  var swipeOption = {
    loop: true,
    // スライダーをループさせる設定
    effect: "fade",
    // フェードさせる為の設定
    fadeEffect: {
      crossFade: true //縦横比が統一されない画像の場合、重なる場合がある為、それを防ぐ設定
    },

    autoplay: {
      delay: 4000,
      // 秒後に次の画像にいくようにする設定
      disableOnInteraction: false // ユーザーが操作後、自動再生を再開する設定
    },

    speed: 1000,
    // 2秒かけ次の画像へ移動させる設定
    allowTouchMove: false // マウスでのスワイプを禁止する設定
  };
  // フォント読み込み完了後にコードを実行
  document.fonts.ready.then(function () {
    // ここにSwiperの初期化コードを挿入
    new Swiper(".js-fv-swiper", swipeOption);
  });

  // キャンペーンセクションのスワイパー
  var mySwiper = new Swiper(".js-campaign-swiper", {
    // 以下にオプションを設定
    loop: true,
    //最後に達したら先頭に戻る
    // slidesPerView: "auto",
    slidesPerView: "1.25",
    spaceBetween: 24,
    width: 355,
    freeModeSticky: true,
    autoplay: {
      delay: 4000,
      // 秒後に次の画像にいくようにする設定
      disableOnInteraction: false // ユーザーが操作後、自動再生を再開する設定
    },

    //ページネーション表示の設定
    pagination: {
      el: ".swiper-pagination",
      //ページネーションの要素
      type: "bullets",
      //ページネーションの種類
      clickable: true //クリックに反応させる
    },

    //ナビゲーションボタン（矢印）表示の設定
    navigation: {
      nextEl: ".swiper-button-next",
      //「次へボタン」要素の指定
      prevEl: ".swiper-button-prev" //「前へボタン」要素の指定
    },

    //スクロールバー表示の設定
    scrollbar: {
      el: ".swiper-scrollbar" //要素の指定
    },

    breakpoints: {
      768: {
        // 画面幅600px以上で適用
        slidesPerView: "3.5",
        spaceBetween: 40,
        width: 1265
      }
    }
  });

  // 画像アニメーション
  //要素の取得とスピードの設定
  var box = $(".js-color"),
    speed = 700;

  //.colorboxの付いた全ての要素に対して下記の処理を行う
  box.each(function () {
    $(this).append('<div class="color"></div>');
    var color = $(this).find($(".color")),
      image = $(this).find("img");
    var counter = 0;
    image.css("opacity", "0");
    color.css("width", "0%");
    //inviewを使って背景色が画面に現れたら処理をする
    color.on("inview", function () {
      if (counter == 0) {
        $(this).delay(200).animate({
          width: "100%"
        }, speed, function () {
          image.css("opacity", "1");
          $(this).css({
            left: "0",
            right: "auto"
          });
          $(this).animate({
            width: "0%"
          }, speed);
        });
        counter = 1;
      }
    });
  });
  $(".js-page-top-btn").on("click", function () {
    $("body,html").animate({
      scrollTop: 0
    }, 500);
    return false;
  });

  // トップページボタン：最初非表示→スクロールしたら表示
  $(function () {
    // 変数にクラスを入れる
    var btn = $(".js-page-top-btn");

    //スクロールしてページトップから100に達したらボタンを表示
    $(window).on("load scroll", function () {
      if ($(this).scrollTop() > 100) {
        btn.addClass("active");
      } else {
        btn.removeClass("active");
      }
    });

    //スクロールしてトップへ戻る
    btn.on("click", function () {
      $("body,html").animate({
        scrollTop: 0
      });
    });
  });

  // Aboutモーダル
  // JavaScriptの部分
  $(function () {
    $(".js-modal-open").each(function () {
      $(this).on("click", function () {
        var target = $(this).data("target");
        var modal = document.getElementById(target);
        $(modal).fadeIn();
        return false;
      });
    });
    $(".js-modal-close").on("click", function () {
      $(".js-modal").fadeOut();
      return false;
    });
  });

  // informationページ　タブ切り替え
  $(function () {
    $(".js-info-content-tab").on("click", function () {
      $(".info-content__tab, .info-content__card").removeClass("active");
      $(this).addClass("active");
      var index = $(".js-info-content-tab").index(this);
      $(".js-info-content-card").eq(index).addClass("active");
    });
  });

  // Blogページ　アーカイブセクション　アコーディオン
  // 第一階層
  $(function () {
    // 最初のコンテンツは表示
    $(".js-accordion-item .js-side-menu__accordion-content").css("display", "block");
    // 最初の矢印は開いた時の状態に
    $(".js-accordion-item .js-accordion-title").addClass("open");
    // タイトルをクリックすると
    $(".js-accordion-title").on("click", function () {
      // クリックしたタイトル以外のopenクラスを外す
      $(".js-accordion-title").not(this).removeClass("open");
      // クリックしたタイトル以外のcontentを閉じる
      $(".js-accordion-title").not(this).next().slideUp(300);
      // クリックしたタイトルにopenクラスを付与
      $(this).toggleClass("open");
      // クリックしたタイトルのcontentを開閉
      $(this).next().slideToggle(300);
    });
  });
  // 第二階層
  $(function () {
    // タイトルをクリックすると
    $(".js-accordion-title-month").on("click", function () {
      // クリックした次の要素を開閉
      $(this).next().slideToggle(300);
      // タイトルにopenクラスを付け外しして矢印の向きを変更
      $(this).toggleClass("open", 300);
    });
  });

  // FAQアコーディオン
  //アコーディオンをクリックした時の動作
  $(".js-faq-accordion-title").on("click", function () {
    //タイトル要素をクリックしたら
    var findElm = $(this).next(".js-faq-accordion-box"); //直後のアコーディオンを行うエリアを取得し
    $(findElm).slideToggle(); //アコーディオンの上下動作

    if ($(this).hasClass("close")) {
      //タイトル要素にクラス名closeがあれば
      $(this).removeClass("close"); //クラス名を除去し
    } else {
      //それ以外は
      $(this).addClass("close"); //クラス名closeを付与
    }
  });

  //ページが読み込まれた際にopenクラスをつけ、openがついていたら開く動作※不必要なら下記全て削除
  $(window).on("load", function () {
    $(".js-faq-accordion-area li:first-of-type section").addClass("open"); //accordion-areaのはじめのliにあるsectionにopenクラスを追加
    $(".open").each(function (index, element) {
      //openクラスを取得
      var Title = $(element).children(".js-faq-accordion-title"); //openクラスの子要素のtitleクラスを取得
      $(Title).addClass("close"); //タイトルにクラス名closeを付与し
      var Box = $(element).children(".js-faq-accordion-box"); //openクラスの子要素boxクラスを取得
      $(Box).slideDown(500); //アコーディオンを開く
    });
  });
});

// ドロワー展開時に、下の要素がスクロールするのを防ぐ
var drawer = document.querySelector(".js-drawer");
var overlay = document.querySelector(".js-header-overlay");

// ドロワーメニューを開く
function openDrawer() {
  drawer.classList.add("is-open");
  overlay.style.display = "block";
  document.body.style.overflow = "hidden"; // ドロワーが開いている間は本体のスクロールを無効にする
}

// ドロワーメニューを閉じる
function closeDrawer() {
  drawer.classList.remove("is-open");
  overlay.style.display = "none";
  document.body.style.overflow = ""; // ドロワーが閉じられたら本体のスクロールを有効にする
}

// ドロワーメニューを開閉するためのイベントリスナー
document.querySelector(".js-hamburger").addEventListener("click", function () {
  if (drawer.classList.contains("is-open")) {
    closeDrawer();
  } else {
    openDrawer();
  }
});

// オーバーレイをクリックしてドロワーを閉じる
overlay.addEventListener("click", closeDrawer);

// ドロワーメニュー内のスクロールを制御する
drawer.addEventListener("scroll", function (event) {
  // ドロワーが開いている場合のみ、ドロワーメニュー内でのスクロールを有効にする
  if (!drawer.classList.contains("is-open")) {
    event.preventDefault();
  }
});