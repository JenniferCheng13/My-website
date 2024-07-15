describe('Memory Game', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5174'); // 确保这个地址是你的应用程序运行的本地地址
    });
  // http://172.20.10.9:5174/
    it('loads the game', () => {
      cy.contains('Memory Game');
      cy.get('.board').should('exist');
      cy.get('.card').should('have.length', 16); // 确认有16张卡片
    });
  
    it('flips cards and matches pairs', () => {
      // 点击两张不同的卡片，假设它们是一对
      cy.get('.card').first().click();
      cy.get('.card').eq(1).click();
  
      // 确认卡片已翻转
      cy.get('.card.flipped').should('have.length', 2);
      
      // 点击另外两张不同的卡片
      cy.get('.card').eq(2).click();
      cy.get('.card').eq(3).click();
  
      // 确认卡片已翻转
      cy.get('.card.flipped').should('have.length', 2);
    });
  
    it('completes the game successfully', () => {
      // 模拟成功完成游戏
      for (let i = 0; i < 16; i += 2) {
        cy.get('.card').eq(i).click();
        cy.get('.card').eq(i + 1).click();
      }
  
      cy.contains('Success!'); // 检查是否显示成功消息
    });
  
    it('fails when time runs out', () => {
      // 模拟等待超过 60 秒
      cy.wait(61000);
      cy.contains('Failed'); // 检查是否显示失败消息
    });
  
    it('fails when clicks run out', () => {
      // 模拟用尽所有点击次数
      for (let i = 0; i < 30; i++) {
        cy.get('.card').eq(i % 16).click();
      }
      cy.contains('Failed'); // 检查是否显示失败消息
    });
  });
  