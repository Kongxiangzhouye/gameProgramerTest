import { profiles, typeKeys } from './profiles.js'
import { roles, roleOrder } from './roles.js'

const roleTitles = {
  client: ['镜头手感师', '世界拼装师', '命中反馈匠', '营地交互师', '系统面板师', '轻触关卡师', '角色演出师', '速度反馈师', '帧感武道家', '沙盒工具师'],
  server: ['剧情状态管家', '大世界档案员', '对局秩序官', '营地房主', '模拟调度员', '轻量数据管家', '卡池账本官', '赛事记录员', '战斗裁判长', '房间广场管理员'],
  design: ['故事节奏编排师', '世界规则编织者', '竞技规则校准师', '合作压力设计师', '数值炼金师', '关卡糖果师', '阵容收藏设计师', '赛道节奏师', '招式节拍师', '派对规则发明家'],
  operation: ['剧情回访策展人', '世界活动主持人', '赛季气氛组', '合作活动掌灯人', '长期循环掌柜', '日常奖励调味师', '卡池活动策展人', '赛事日历管理员', '挑战话题主持人', '社区整活召集人'],
  art: ['氛围小灯画师', '世界地貌造梦师', '竞技识别设计师', '荒野营地造型师', '规则可视化画师', '糖果反馈设计师', '角色星光造型师', '速度镜头画师', '动作姿态雕刻师', '派对玩具设计师'],
  qa: ['叙事岔路捕手', '世界边界巡逻员', '对局异常侦探', '营地混乱观察员', '规则漏洞侦探', '关卡卡点捕手', '养成链路巡检员', '赛道手感校验员', '判定帧检查员', '房间整活测试员'],
}

export const roleProfiles = Object.fromEntries(
  roleOrder.map((roleKey) => [
    roleKey,
    Object.fromEntries(
      typeKeys.map((typeKey, index) => {
        const base = profiles[typeKey]
        const role = roles[roleKey]
        return [
          typeKey,
          {
            title: base.title,
            persona: roleTitles[roleKey][index],
            subtitle: `${role.tone}，更容易被“${base.title}”里的${base.traits[0]}吸引。`,
            temperament: `${role.tone}会把${base.title}看成一组很有意思的细节：${base.temperament}`,
            details: `你会优先盯住 ${base.traits.join('、')}，再把它们翻译成自己身份里最顺手的判断。`,
            vibe: base.vibe,
            attractedTo: base.attractedTo,
          },
        ]
      }),
    ),
  ]),
)
