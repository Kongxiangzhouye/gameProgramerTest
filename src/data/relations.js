export const relationAxes = [
  {
    key: 'realtime',
    title: '实时反馈型',
    resultTitle: '实时手感指挥官',
    types: ['competitiveShooter', 'coopSurvival', 'actionFighting', 'sportsRacing'],
    summary: '多个身份都把注意力投向即时反馈、操作手感、同步、对抗节奏和现场压力。',
  },
  {
    key: 'longterm',
    title: '长期循环型',
    resultTitle: '长线循环建筑师',
    types: ['strategySimulation', 'cardCollection', 'casualPuzzleMobile'],
    summary: '多个身份都在关注数值、奖励、活动、养成和玩家持续回来的理由。',
  },
  {
    key: 'immersion',
    title: '沉浸探索型',
    resultTitle: '沉浸世界编织者',
    types: ['narrativeAdventure', 'openWorldRpg'],
    summary: '多个身份都在反复注意世界感、路线、任务、叙事节奏和探索欲。',
  },
  {
    key: 'creative',
    title: '创造社交型',
    resultTitle: '创造社交策展人',
    types: ['sandboxSocial', 'casualPuzzleMobile', 'coopSurvival'],
    summary: '多个身份都倾向于给玩家规则、工具和舞台，再看他们自己玩出变化和关系。',
  },
]

export const stageLabels = {
  prototype: '原型直觉',
  pipeline: '管线秩序',
  content: '内容生长',
  testing: '验证敏感度',
  launch: '上线稳定感',
  retrospective: '复盘迁移力',
}

function toScoreMap(entry, typeKeys) {
  if (entry.scores) return entry.scores
  return Object.fromEntries(typeKeys.map((key) => [key, key === entry.topKey ? entry.score || 1 : 0]))
}

function topItems(map, limit = 3) {
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
}

function getAxisScores(entries, typeKeys) {
  return relationAxes
    .map((axis) => ({
      ...axis,
      score: entries.reduce((total, entry) => {
        const scores = toScoreMap(entry, typeKeys)
        return total + axis.types.reduce((sum, typeKey) => sum + (scores[typeKey] || 0), 0)
      }, 0),
    }))
    .sort((a, b) => b.score - a.score)
}

function getCombinedTypeScores(entries, typeKeys) {
  const totals = Object.fromEntries(typeKeys.map((key) => [key, 0]))
  entries.forEach((entry) => {
    const scores = toScoreMap(entry, typeKeys)
    typeKeys.forEach((key) => {
      totals[key] += scores[key] || 0
    })
  })
  return totals
}

function getStageTotals(entries) {
  const totals = {}
  entries.forEach((entry) => {
    Object.entries(entry.stageScores || {}).forEach(([stage, score]) => {
      totals[stage] = (totals[stage] || 0) + score
    })
  })
  return totals
}

function getRoleSpread(entry, typeKeys) {
  const sorted = topItems(toScoreMap(entry, typeKeys), 3)
  const gap = (sorted[0]?.[1] || 0) - (sorted[1]?.[1] || 0)
  return { sorted, gap }
}

function describeGap(gap) {
  if (gap >= 10) return '主方向非常明确'
  if (gap >= 6) return '主次关系清楚'
  if (gap >= 3) return '有主方向，但旁边还有强烈副倾向'
  return '两个方向几乎并列，需要读成混合型'
}

export function buildCrossRoleInsight(history, roles, profiles, typeKeys) {
  const roleEntries = Object.entries(history)
  if (roleEntries.length < 2) return null

  const entries = roleEntries.map(([roleKey, entry]) => ({
    ...entry,
    roleKey,
    roleName: roles[roleKey].shortName,
  }))
  const totalAnswers = entries.reduce((sum, entry) => sum + (entry.answers?.length || 0), 0)
  const axisScores = getAxisScores(entries, typeKeys)
  const dominantAxis = axisScores[0]
  const secondAxis = axisScores[1]
  const combinedTypes = getCombinedTypeScores(entries, typeKeys)
  const topTypes = topItems(combinedTypes, 5)
  const topType = topTypes[0]
  const secondType = topTypes[1]
  const stageTotals = getStageTotals(entries)
  const topStages = topItems(stageTotals, 3)
  const lowStages = Object.entries(stageTotals).sort((a, b) => a[1] - b[1]).slice(0, 2)
  const topStageNames = topStages.map(([stage]) => stageLabels[stage] || stage)
  const lowStageNames = lowStages.map(([stage]) => stageLabels[stage] || stage)
  const topTypeGap = (topType?.[1] || 0) - (secondType?.[1] || 0)
  const topTypeShare = Math.round(((topType?.[1] || 0) / Math.max(1, topTypes.reduce((sum, [, score]) => sum + score, 0))) * 100)
  const uniqueTopTypes = new Set(entries.map((entry) => entry.topKey)).size
  const roleCards = entries.map((entry) => {
    const spread = getRoleSpread(entry, typeKeys)
    const top = spread.sorted[0]
    const second = spread.sorted[1]
    const topStage = topItems(entry.stageScores || {}, 1)[0]
    return {
      roleKey: entry.roleKey,
      roleName: entry.roleName,
      topType: profiles[top[0]].title,
      secondType: profiles[second[0]].title,
      topScore: top[1],
      secondScore: second[1],
      gap: spread.gap,
      read: describeGap(spread.gap),
      stage: topStage ? stageLabels[topStage[0]] : '阶段信号不足',
    }
  })

  const resultTitle = `${dominantAxis.resultTitle} · ${profiles[topType[0]].title}`
  const overview = `你已经完成 ${entries.length} 个身份、${totalAnswers} 道题。综合最高类型是「${profiles[topType[0]].title}」，最高轴线是「${dominantAxis.title}」。这不是单个身份的一次判断，而是多个岗位视角叠出来的项目偏好。`
  const corePreference = topTypeGap >= 12
    ? `「${profiles[topType[0]].title}」领先第二名 ${topTypeGap} 分，占前五类型总分约 ${topTypeShare}%。这说明你的跨身份偏好很集中：不管换到哪个岗位，你都会反复被同一种项目气质吸过去。`
    : `「${profiles[topType[0]].title}」领先第二名 ${topTypeGap} 分，占前五类型总分约 ${topTypeShare}%。它是当前主结果，但旁边的「${profiles[secondType[0]].title}」也很强，所以更适合读成复合型。`
  const axisRead = `主轴「${dominantAxis.title}」说明你最容易被什么吸引；副轴「${secondAxis.title}」说明你会怎样补完整个项目。${dominantAxis.summary} 同时，${secondAxis.summary}`
  const roleDifference = uniqueTopTypes >= Math.min(entries.length, 3)
    ? `不同身份的 top1 分布比较分散，说明你换身份时会真的切换思考方式：有的身份在看体验，有的身份在看系统，有的身份在看风险和长期维护。`
    : `多个身份的 top1 比较接近，说明你的偏好稳定。差异主要不是“喜欢什么类型”，而是每个身份会从不同细节进入同一个方向。`
  const stageRead = topStages.length
    ? `最高信号集中在「${topStageNames.join('、')}」，说明你做选择时最容易被这些项目阶段牵动。相对较弱的是「${lowStageNames.join('、')}」，这些阶段不是不重要，而是没有那么直接点燃你的判断。`
    : '阶段信号还不够完整，再测更多身份会更清楚。'
  const stability = roleCards.some((card) => card.gap < 3)
    ? `有些身份内部 top1 和 top2 几乎并列，因此这份结果不是单一标签，而是一张混合画像。重点应该看“主结果 + 副倾向 + 身份差异”。`
    : `多数身份内部主次分明，跨身份总分也有明显主轴，所以这份结果方向感比较稳定。`
  const nextProbe = entries.length < 6
    ? `继续补测未完成身份，会让画像更细：美术能补视觉和氛围偏好，测试能补风险敏感度，运营能补长期回访和社区偏好。`
    : `六个身份已经完成，可以把这份结果看成完整画像：它描述的是你从多个项目岗位一起看游戏时，最容易反复选择的方向。`

  return {
    resultTitle,
    axisTitle: dominantAxis.title,
    completedCount: entries.length,
    totalAnswers,
    shareLine: `${entries.length} 个身份、${totalAnswers} 道题：${resultTitle}`,
    overview,
    corePreference,
    axisRead,
    roleDifference,
    stageRead,
    stability,
    nextProbe,
    topTypes: topTypes.map(([key, score]) => ({ key, title: profiles[key].title, score })),
    topStages: topStages.map(([key, score]) => ({ key, title: stageLabels[key] || key, score })),
    roleCards,
  }
}
