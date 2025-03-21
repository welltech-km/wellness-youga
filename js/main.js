// アコーディオン
document.addEventListener('DOMContentLoaded', function() {
  var acc = document.getElementsByClassName("accordion");
  for (var i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
          this.classList.toggle("accordion__active");
          var panel = this.nextElementSibling;
          if (panel.style.maxHeight) {
              panel.style.maxHeight = null;
              setTimeout(() => {
                  panel.classList.remove("open");
              }, 300); // match the duration of the transition
          } else {
              panel.classList.add("open");
              panel.style.maxHeight = panel.scrollHeight + "px";
          }
      });
  }
});

// チェックボックス
document.addEventListener('DOMContentLoaded', function() {
  const checkboxes = document.querySelectorAll('.checkbox-input');

  checkboxes.forEach(function(checkbox) {
      checkbox.addEventListener('change', function() {
          const checkBoxLabel = checkbox.closest('.check-box');
          if (checkbox.checked) {
              checkBoxLabel.classList.add('check-box__checked');
          } else {
              checkBoxLabel.classList.remove('check-box__checked');
          }
      });
  });
});


//アンカーリンク
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // デフォルトのアンカー動作を防ぐ

            const targetId = this.getAttribute("href").substring(1); // `#`を除いたID取得
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                // URLのハッシュを変更せずに履歴を更新
                history.replaceState(null, null, " ");
            }
        });
    });
});

//モーダル
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".o2h2-modal button");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const modalContent = this.parentElement.querySelector(".el-content").innerHTML;
            openModal(modalContent);
        });
    });

    function openModal(content) {
        let modalContainer = document.querySelector(".modal");
        if (!modalContainer) {
            modalContainer = document.createElement("div");
            modalContainer.classList.add("modal");
            modalContainer.innerHTML = `
                <div class="modal-content">
                    <div class="modal-body">${content}</div>
                    <button class="modal-close">閉じる</button>
                </div>
            `;
            document.body.appendChild(modalContainer);

            modalContainer.querySelector(".modal-close").addEventListener("click", function () {
                modalContainer.remove();
            });

            modalContainer.addEventListener("click", function (event) {
                if (event.target === modalContainer) {
                    modalContainer.remove();
                }
            });
        }
    }
});




// メニュー展開時に背景を固定
const backgroundFix = (bool) => {
    const scrollingElement = () => {
      const browser = window.navigator.userAgent.toLowerCase();
      if ("scrollingElement" in document) return document.scrollingElement;
      return document.documentElement;
    };
  
    const scrollY = bool
      ? scrollingElement().scrollTop
      : parseInt(document.body.style.top || "0");
  
    const fixedStyles = {
      height: "100vh",
      position: "fixed",
      top: `${scrollY * -1}px`,
      left: "0",
      width: "100vw"
    };
  
    Object.keys(fixedStyles).forEach((key) => {
      document.body.style[key] = bool ? fixedStyles[key] : "";
    });
  
    if (!bool) {
      window.scrollTo(0, scrollY * -1);
    }
  };
  
  // 変数定義
  const CLASS = "-active";
  let flg = false;
  let accordionFlg = false;
  
  let hamburger = document.getElementById("js-hamburger");
  let focusTrap = document.getElementById("js-focus-trap");
  let menu = document.querySelector(".js-nav-area");
  let link = document.querySelectorAll(".global-navigation__link");
  
  
  // メニュー開閉制御
  hamburger.addEventListener("click", (e) => { //ハンバーガーボタンが選択されたら
    e.currentTarget.classList.toggle(CLASS);
    menu.classList.toggle(CLASS);
    if (flg) {// flgの状態で制御内容を切り替え
      backgroundFix(false);
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.focus();
      flg = false;
    } else {
      backgroundFix(true);
      hamburger.setAttribute("aria-expanded", "true");
      flg = true;
    }
  });
  
  link.forEach((el) => {
    el.addEventListener('click', (event) => {
  
      event.preventDefault(); // デフォルトのリンク動作を防止
      const target = el.getAttribute("href"); // リンク先のIDを取得
  
      // メニューを閉じる
      menu.classList.remove('-active');
      hamburger.classList.remove('-active');
      hamburger.setAttribute("aria-expanded", "false");
  
      // 背景固定を解除してからスクロールを実行
      backgroundFix(false);
  
      // スクロール処理
      const element = document.querySelector(target);
      const top = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
  
  
  
  
  window.addEventListener("keydown", () => {　//escキー押下でメニューを閉じられるように
    if (event.key === "Escape") {
      hamburger.classList.remove(CLASS);
      menu.classList.remove(CLASS);
  
      backgroundFix(false);
      hamburger.focus();
      hamburger.setAttribute("aria-expanded", "false");
      flg = false;
    }
  });
  
  // フォーカストラップ制御
  focusTrap.addEventListener("focus", (e) => {
    hamburger.focus();
  });
