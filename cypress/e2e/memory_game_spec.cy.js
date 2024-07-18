describe("Memory Game", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5174"); // 确保这个地址是你的应用程序运行的本地地址
  });
  // http://172.20.10.9:5174/
  it("loads the game", () => {
    cy.contains("Memory Game");
    cy.get(".board").should("exist");
    cy.get(".card").should("have.length", 16); // 确认有16张卡片
  });

  it("flips cards and matches pairs", () => {
    // 点击两张不同的卡片，假设它们是一对
    cy.get(".card").first().click();
    cy.get(".card").eq(1).click();

    // 确认卡片已翻转
    cy.get(".card.flipped").should("have.length", 2);

    // 点击另外两张不同的卡片
    cy.get(".card").eq(2).click();
    cy.get(".card").eq(3).click();

    // 确认卡片已翻转
    cy.get(".card.flipped").should("have.length", 2);
  });

  // it("completes the game successfully", () => {
  //   // 模拟成功完成游戏
  //   const cardCount = 16; // 总卡片数量
  //   const pairs = cardCount / 2; // 总对数

  //   for (let i = 0; i < pairs; i++) {
  //     for (let j = i * 2; j < i * 2 + 2; j++) {
  //       cy.get(".card").eq(j).click();
  //       cy.wait(500); // 增加等待时间，确保页面有时间更新状态
  //     }
  //   }

  //   cy.contains("Success!", { timeout: 10000 }); // 增加超时时间
  // });

  it("completes the game successfully", () => {
    const cardCount = 16; // 总卡片数量
    const cardPairs = {}; // 用于存储已翻开的卡片及其索引

    // 模拟成功完成游戏
    for (let i = 0; i < cardCount; i++) {
      cy.get(".card").eq(i).click(); // 翻开第i张牌

      cy.get(".card")
        .eq(i)
        .invoke("text")
        .then((text1) => {
          if (cardPairs[text1]) {
            // 如果卡片内容已存在于 cardPairs 中，说明找到了配对的卡片
            const matchingIndex = cardPairs[text1];
            delete cardPairs[text1]; // 移除已匹配的卡片
            cy.get(".card").eq(matchingIndex).click(); // 翻开已记录的配对卡片
          } else {
            // 否则，记录卡片内容和索引
            cardPairs[text1] = i;
          }

          // 检查是否所有卡片都已匹配
          if (Object.keys(cardPairs).length === 0) {
            cy.contains("Success!", { timeout: 10000 }); // 增加超时时间
          }
        });
    }
  });

  it("fails when time runs out", () => {
    // 模拟等待超过 60 秒
    cy.wait(61000);
    cy.contains("Failed", { timeout: 10000 }); // 检查是否显示失败消息
  });

  // it("fails when clicks run out", () => {
  //   // 模拟用尽所有点击次数
  //   for (let i = 0; i < 30; i++) {
  //     for (let j = 0; j < 16; j++) {
  //       cy.get('.card').eq(j).click();
  //     }
  //   }
  //   cy.contains("Failed"); // 检查是否显示失败消息
  // });

  // it('fails when clicks run out', () => {
  //   // 模拟用尽所有点击次数
  //   for (let i = 0; i < 30; i++) {
  //     for (let j = 0; j < 16; j++) {
  //       cy.get('.card').eq(j).should('exist').should('be.visible').click(); // 确保元素存在且可见
  //       // cy.wait(200); // 增加等待时间，确保页面有时间更新状态
  //     }
  //   }
  //   cy.contains('Failed', { timeout: 10000 }); // 增加超时时间
  // });

  // it('fails when clicks run out', () => {
  //   // 模拟用尽所有点击次数
  //   for (let i = 0; i < 30; i++) {
  //     if (i >= 29) {
  //       cy.contains('Failed', { timeout: 10000 }); // 检查是否显示失败消息
  //       break;
  //     }
  //     for (let j = 0; j < 16; j++) {
  //       cy.get('.card').eq(j).click();
  //       if (i === 29) break;
  //     }
  //   }
  // });
  it("rapidly clicks cards", () => {
    // 快速点击卡片，确保应用程序能够正确处理快速点击
    for (let i = 0; i < 16; i++) {
      cy.get(".card").eq(i).click();
    }
    cy.get(".card.flipped").should("have.length", 2); // 确认卡片已翻转
  });

  it("checks responsiveness on different screen sizes", () => {
    // 检查不同浏览器窗口大小的响应性
    cy.viewport(320, 480);
    cy.get(".board").should("be.visible");

    cy.viewport(1280, 720);
    cy.get(".board").should("be.visible");
  });
});
