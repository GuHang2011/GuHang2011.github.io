<script setup>
import { ElButton, ElCard, ElTag, ElSelect, ElOption, ElSwitch, ElAlert } from 'element-plus';
import { usePresenter } from '../../studio.js';
const { data, time, phase, host, avatarReady, avatarLoading, avatarError, loadError, reducedMotion, systemReduced, speed, bilingual, poses, duration, index, cue, clock, timeLabel, status, playLabel, avatarStatus, toggle, restart, seek, selectHost, loadMao } = usePresenter();
</script>

<template>
  <div id="studio" class="studio" :data-state="phase" :data-host="host" :data-avatar-ready="avatarReady">
    <ElCard class="preview-panel" shadow="never" :body-style="{ padding: '0' }">
      <template #header><div class="panel-heading"><h2><span class="panel-dot" aria-hidden="true"></span>实时预览</h2><ElTag effect="plain" size="small">2D 角色 · 合成语音</ElTag></div></template>
      <section class="stage" aria-label="虚拟主播画面">
        <div class="stage-top"><span class="brand">丝路智链 <small>SILK ROAD INTELLIGENCE</small></span><span class="stage-badge">公开演示 / DEMO</span></div>
        <div class="stage-left"><p class="eyebrow">VIRTUAL PRESENTER</p><h2 id="stage-title">{{ cue?.title || '认识卡通主播' }}</h2><p class="stage-description">让讲稿、语音与角色<br>在同一条时间线上协作。</p><div class="sample"><span>本场教学样品</span><strong>草原蜂蜜</strong><p>名称 · 规格 · 产地核对</p><small>合成商品，不对应真实交易</small></div></div>
        <div id="mao-slot" class="host-slot mao-slot" aria-hidden="true" :hidden="host !== 'mao'"><img id="mao-preview" src="mao-preview.png" alt="" width="320" height="320" :hidden="avatarReady"><div id="mao-canvas"></div></div>
        <div id="lin-slot" class="host-slot" aria-hidden="true" :hidden="host !== 'lin'"><div v-for="(svg, pose) in poses" :key="pose" :data-pose="pose" :hidden="pose !== cue?.gesture" v-html="svg"></div></div>
        <div class="host-name"><strong id="host-label">{{ host === 'mao' ? 'Mao / 虹色まお' : '小林 / LIN' }}</strong><small id="host-kind">{{ host === 'mao' ? 'Live2D 示例角色 © Live2D Inc.' : '二维 SVG 讲解员' }}</small></div>
        <div class="stage-caption"><span id="chapter-label">{{ String(index + 1).padStart(2, '0') }} / {{ cue?.title || '准备讲稿' }}</span><p id="caption-zh">{{ cue?.zh || '正在加载讲稿。点击“开始讲解”，观看角色、字幕和播放进度的联动。' }}</p><p id="caption-en" lang="en" :hidden="!bilingual">{{ cue?.en }}</p></div>
        <div class="stage-meter" aria-hidden="true"><i v-for="bar in 12" :key="bar"></i></div>
      </section>
    </ElCard>

    <ElCard class="playback-panel" shadow="never">
      <div class="playback-top"><div class="transport"><ElButton id="play" type="primary" :aria-label="playLabel" :disabled="!data" @click="toggle"><span class="play-symbol" aria-hidden="true">{{ phase === 'playing' ? 'Ⅱ' : '▷' }}</span>{{ playLabel }}</ElButton><ElButton id="restart" :disabled="!data" @click="restart">从头开始</ElButton></div><span id="play-status" role="status" :class="['play-status', { active: phase === 'playing' }]">{{ status }}</span></div>
      <div class="timeline-row"><label class="sr-only" for="timeline">播放进度</label><input id="timeline" type="range" min="0" :max="duration || 100" :value="time" step="0.1" :disabled="!data" :aria-valuetext="`${clock(time)}，总时长 ${clock(duration)}`" @input="seek($event.target.value)"><output id="time" for="timeline">{{ timeLabel }}</output></div>
      <p class="playback-tip">点击后播放中文配音 · 选择章节可直接定位</p>
      <ElAlert v-if="loadError" id="load-error" :title="loadError" type="error" :closable="false" show-icon />
    </ElCard>

    <ElCard class="console" shadow="never">
      <template #header><div class="panel-heading"><h2>讲解设置</h2><span class="panel-caption">可随时调整</span></div></template>
      <section class="control-group" aria-labelledby="avatar-heading"><h3 id="avatar-heading">主播形象<span>切换保留进度</span></h3>
        <div class="avatar-choices" role="group" aria-label="选择主播形象"><ElButton v-for="name in ['mao', 'lin']" :key="name" :data-host-choice="name" :aria-pressed="host === name" :class="{ selected: host === name }" @click="selectHost(name)"><img v-if="name === 'mao'" src="mao-preview.png" alt="" width="40" height="40"><span v-else class="lin-mark" aria-hidden="true">林</span><span>{{ name === 'mao' ? 'Mao' : '小林' }}<small>{{ name === 'mao' ? 'Live2D 卡通主播' : 'SVG 讲解员' }}</small></span></ElButton></div>
        <p id="avatar-status" role="status">{{ avatarStatus }}</p><ElButton v-if="host === 'mao' && avatarError" id="avatar-retry" size="small" :loading="avatarLoading" @click="loadMao">重新加载 Mao</ElButton>
      </section>
      <section class="control-group chapter-group" aria-labelledby="chapter-heading"><h3 id="chapter-heading">讲解章节<span>共 6 章 · 1 分 41 秒</span></h3>
        <ol class="chapters"><li v-for="(segment, i) in data?.segments || []" :key="segment.start"><button type="button" :data-chapter="i" :aria-current="index === i ? 'step' : undefined" @click="seek(segment.start)"><b>{{ String(i + 1).padStart(2, '0') }}</b><span>{{ segment.title }}</span><small>{{ clock(segment.start) }}</small></button></li></ol>
      </section>
      <section class="control-group preferences" aria-labelledby="preference-heading"><h3 id="preference-heading">播放偏好</h3>
        <div class="preference-row"><label for="playback-speed">讲解速度</label><ElSelect id="playback-speed" v-model="speed" aria-label="讲解速度" :teleported="false"><ElOption v-for="rate in [0.75, 1, 1.25, 1.5]" :key="rate" :label="rate === 1 ? '1.0× 正常' : `${rate}×`" :value="rate" /></ElSelect></div>
        <div class="preference-row"><label for="bilingual">中英双语字幕</label><ElSwitch id="bilingual" v-model="bilingual" aria-label="中英双语字幕" /></div>
        <div class="preference-row"><label for="reduce-motion">减少角色动作</label><ElSwitch id="reduce-motion" v-model="reducedMotion" aria-label="减少角色动作" /></div>
        <p v-if="systemReduced" class="preference-note">已遵循系统的减少动态效果设置。</p>
      </section>
      <p class="console-note">口型随音量变化，未进行音素级对齐。</p>
    </ElCard>
  </div>

  <section id="transcript-section" class="transcript section-block" aria-labelledby="transcript-heading"><div class="section-heading"><div><p class="eyebrow">SCRIPT / 06 CHAPTERS</p><h2 id="transcript-heading">跟着讲稿，理解每一步</h2></div><a href="script.json">查看章节数据 ↗</a></div>
    <div id="transcript" class="transcript-grid"><details v-for="(segment, i) in data?.segments || []" :key="segment.start"><summary><span>{{ String(i + 1).padStart(2, '0') }}</span>{{ segment.title }}<small>{{ clock(segment.start) }}</small></summary><div class="transcript-body"><p lang="zh">{{ segment.zh }}</p><p lang="en">{{ segment.en }}</p><ElButton size="small" plain type="primary" @click="seek(segment.start)">定位到本章</ElButton></div></details></div>
  </section>
</template>
