import { createQuestions } from './factory.js'

const rows = [
  ['prototype', '还没上线前，你会先判断这个版本有没有“能火起来的一句话卖点”？', [
    ['一句话就讲得清、配张图就想转发的版本主题', { narrativeAdventure: 2, cardCollection: 1 }],
    ['能让玩家立刻聊输赢、聊段位的目标', { competitiveShooter: 3 }],
    ['能让朋友自然组队开黑的活动规则', { coopSurvival: 2, sandboxSocial: 1 }],
    ['能驱动玩家每天上线 10 分钟的轻量进度', { casualPuzzleMobile: 3 }],
  ]],
  ['prototype', '首批玩家进来后，你最想先盯哪类运营信号？', [
    ['玩家会不会自发晒图、做二创', { sandboxSocial: 3 }],
    ['从活动页到领奖页的转化有没有断层', { cardCollection: 3 }],
    ['打完一局后，多快会点“再来一局”', { competitiveShooter: 3 }],
    ['做完任务后，第二天还有没有动力回来', { openWorldRpg: 2, casualPuzzleMobile: 1 }],
  ]],
  ['prototype', '做第一轮预热时，你会优先准备哪类内容？', [
    ['角色/皮肤排期和配套宣发素材', { cardCollection: 3 }],
    ['赛季规则说明和高光回放片段', { sportsRacing: 2, competitiveShooter: 1 }],
    ['世界观短片和剧情时间线梳理', { narrativeAdventure: 3 }],
    ['社群共创话题和 UGC 模板', { sandboxSocial: 3 }],
  ]],

  ['pipeline', '活动配置体系先规范哪块，最能少出线上事故？', [
    ['开始/结束时间和时区规则', { sportsRacing: 2, cardCollection: 1 }],
    ['领奖条件和补发兜底', { cardCollection: 3 }],
    ['任务刷新节奏和回流门槛', { casualPuzzleMobile: 3 }],
    ['组队人数门槛和掉线处理', { coopSurvival: 3 }],
  ]],
  ['pipeline', '排版本日历时，你会先锁定哪类关键节点？', [
    ['宣发节奏和素材交付的倒排计划', { narrativeAdventure: 2, openWorldRpg: 1 }],
    ['赛季重置和排行榜结算窗口', { competitiveShooter: 3 }],
    ['大型活动与卡池上线的错峰节奏', { cardCollection: 3 }],
    ['社区挑战和创作征集周期', { sandboxSocial: 3 }],
  ]],
  ['pipeline', '你希望数据看板先回答清楚哪个问题？', [
    ['玩家从“看到活动”到“实际参与”卡在哪一步', { casualPuzzleMobile: 2, cardCollection: 2 }],
    ['不同分段玩家各自在哪个时间点流失', { competitiveShooter: 3 }],
    ['社群传播到底带来了多少自然新增', { sandboxSocial: 3 }],
    ['世界事件有没有明显提升探索回访', { openWorldRpg: 3 }],
  ]],

  ['content', '新版本主打内容，你更愿意押注哪种方向？', [
    ['“这段剧情一定要看完”的主题事件', { narrativeAdventure: 3 }],
    ['“这个赛季必须冲分”的段位目标', { competitiveShooter: 3 }],
    ['“这期卡池值得抽”的收集驱动力', { cardCollection: 3 }],
    ['“这周朋友局必须开起来”的社交玩法', { coopSurvival: 2, sandboxSocial: 1 }],
  ]],
  ['content', '做回流方案时，你最先补哪块短板？', [
    ['回归任务链和追赶奖励', { casualPuzzleMobile: 2, openWorldRpg: 1 }],
    ['老玩家赛季目标断档的问题', { competitiveShooter: 3 }],
    ['卡池价值感和资源焦虑', { cardCollection: 3 }],
    ['社群关系断了之后怎么把人拉回来', { sandboxSocial: 3 }],
  ]],
  ['content', '做社区运营时，你最想放大哪类讨论？', [
    ['打法攻略和阵容博弈', { strategySimulation: 2, competitiveShooter: 1 }],
    ['剧情猜想和角色关系', { narrativeAdventure: 3 }],
    ['玩家创作和二创接龙', { sandboxSocial: 3 }],
    ['抽卡欧非和养成路线', { cardCollection: 3 }],
  ]],
]

export const operationQuestions = createQuestions(rows)
