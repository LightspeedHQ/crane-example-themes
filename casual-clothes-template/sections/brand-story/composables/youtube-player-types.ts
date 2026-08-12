export interface YTPlayer {
	playVideo: () => void
	pauseVideo: () => void
	getPlayerState: () => number
	destroy: () => void
	loadVideoById: (videoId: string) => void
}

export interface YTPlayerConstructor {
	new(elementId: string, options: YTPlayerOptions): YTPlayer
}

export interface YTPlayerOptions {
	height: string
	width: string
	videoId: string
	host: string
	playerVars: Record<string, number | string>
	events: {
		onReady?: () => void
		onStateChange?: (event: YTStateChangeEvent) => void
		onError?: (event: YTErrorEvent) => void
	}
}

export interface YTNamespace {
	Player: YTPlayerConstructor
	PlayerState: {
		PLAYING: number
	}
}

export interface YTStateChangeEvent {
	data: number
}

export interface YTErrorEvent {
	data: number
}

export interface WindowWithYT extends Window {
	YT?: YTNamespace
	onYouTubeIframeAPIReady?: () => void
	__brandStoryCounter?: number
}

export const YOUTUBE_ERROR_MESSAGES: Record<number, string> = {
	2: 'Invalid video ID',
	5: 'HTML5 player error',
	100: 'Video not found or private',
	101: 'Video embedding not allowed',
	150: 'Video embedding not allowed',
}

export const DEFAULT_PLAYER_VARS = {
	controls: 1,
	mute: 1,
	playsinline: 1,
	rel: 0,
	modestbranding: 1,
	fs: 1,
	iv_load_policy: 3,
	autoplay: 0,
	autohide: 1,
} as const
