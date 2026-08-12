import { ref, onMounted, onBeforeUnmount, watch, type Ref, type ComputedRef } from 'vue'
import type {
	YTPlayer,
	YTStateChangeEvent,
	YTErrorEvent,
	WindowWithYT,
} from './youtube-player-types'
import { YOUTUBE_ERROR_MESSAGES, DEFAULT_PLAYER_VARS } from './youtube-player-types'

declare const window: WindowWithYT

let instanceCounter = 0

function getUniquePlayerId(): string {
	if (typeof window !== 'undefined') {
		if (!window.__brandStoryCounter) {
			window.__brandStoryCounter = 0
		}
		instanceCounter = ++window.__brandStoryCounter
	}
	return `brand-story-youtube-player-${instanceCounter}`
}

export function useYouTubePlayer(videoId: Ref<string> | ComputedRef<string>) {
	const isPlaying = ref(false)
	const hasPlayedOnce = ref(false)
	const player = ref<YTPlayer | null>(null)
	const playerId = getUniquePlayerId()
	const isClient = ref(false)
	const hasError = ref(false)
	const errorMessage = ref('')

	function loadYouTubeAPI() {
		if (typeof window === 'undefined') return

		const checkAndInit = () => {
			// eslint-disable-next-line no-restricted-globals -- SSR-safe: guarded by typeof window check in parent
			const element = document.getElementById(playerId)
			if (!element) {
				setTimeout(checkAndInit, 100)
				return
			}

			if (window.YT?.Player) {
				initializePlayer()
				return
			}

			// eslint-disable-next-line no-restricted-globals -- SSR-safe: guarded by typeof window check in parent
			if (document.querySelector('script[src*="youtube.com/iframe_api"]')) {
				// Add timeout (10s) to prevent infinite polling if script never loads
				const TIMEOUT_MS = 10000
				const startTime = Date.now()
				const waitForYT = setInterval(() => {
					if (window.YT?.Player) {
						clearInterval(waitForYT)
						initializePlayer()
					} else if (Date.now() - startTime > TIMEOUT_MS) {
						clearInterval(waitForYT)
						hasError.value = true
						errorMessage.value = 'YouTube API failed to load within 10s'
					}
				}, 100)
				return
			}

			const originalCallback = window.onYouTubeIframeAPIReady
			window.onYouTubeIframeAPIReady = () => {
				if (originalCallback && typeof originalCallback === 'function') {
					originalCallback()
				}
				initializePlayer()
			}

			// eslint-disable-next-line no-restricted-globals -- SSR-safe: guarded by typeof window check in parent
			const tag = document.createElement('script')
			tag.src = 'https://www.youtube.com/iframe_api'
			tag.async = true
			// eslint-disable-next-line no-restricted-globals -- SSR-safe: guarded by typeof window check in parent
			const firstScriptTag = document.getElementsByTagName('script')[0]
			firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
		}

		checkAndInit()
	}

	function initializePlayer() {
		if (typeof window === 'undefined') return
		if (player.value) return

		const videoIdToUse = videoId.value
		if (!videoIdToUse) {
			hasError.value = true
			return
		}

		const YT = window.YT
		if (!YT?.Player) return

		// eslint-disable-next-line no-restricted-globals -- SSR-safe: guarded by typeof window check above
		const element = document.getElementById(playerId)
		if (!element) return

		hasError.value = false
		errorMessage.value = ''

		try {
			player.value = new YT.Player(playerId, {
				height: '100%',
				width: '100%',
				videoId: videoIdToUse,
				host: 'https://www.youtube.com',
				playerVars: {
					...DEFAULT_PLAYER_VARS,
					origin: window.location.origin,
				},
				events: {
					onReady: onPlayerReady,
					onStateChange: onPlayerStateChange,
					onError: onPlayerError,
				},
			})
		} catch {
			hasError.value = true
			errorMessage.value = 'Failed to load video player'
		}
	}

	function updateVideo(newVideoId: string) {
		if (typeof window === 'undefined') return

		if (!newVideoId) {
			hasError.value = true
			errorMessage.value = 'No video ID provided'
			hasPlayedOnce.value = false
			isPlaying.value = false
			return
		}

		if (!player.value?.loadVideoById) return

		hasError.value = false
		errorMessage.value = ''
		hasPlayedOnce.value = false
		isPlaying.value = false

		try {
			player.value.loadVideoById(newVideoId)
		} catch {
			hasError.value = true
			errorMessage.value = 'Failed to load video'
		}
	}

	function onPlayerReady() {
		hasError.value = false
		errorMessage.value = ''
	}

	function onPlayerStateChange(event: YTStateChangeEvent) {
		if (typeof window === 'undefined') return

		const YT = window.YT
		if (!YT) return

		isPlaying.value = event.data === YT.PlayerState.PLAYING

		if (event.data === YT.PlayerState.PLAYING && !hasPlayedOnce.value) {
			hasPlayedOnce.value = true
		}

		if (event.data === 0) {
			hasPlayedOnce.value = false
			isPlaying.value = false
		}
	}

	function onPlayerError(event: YTErrorEvent) {
		hasError.value = true
		errorMessage.value = YOUTUBE_ERROR_MESSAGES[event.data] ?? 'Failed to load video'
	}

	function togglePlay() {
		if (!player.value?.getPlayerState) return
		if (typeof window === 'undefined') return

		const YT = window.YT
		if (!YT) return

		try {
			const state = player.value.getPlayerState()
			if (state === YT.PlayerState.PLAYING) {
				player.value.pauseVideo()
			} else {
				player.value.playVideo()
			}
		} catch {
			// Silently handle toggle errors
		}
	}

	onMounted(() => {
		isClient.value = true
		loadYouTubeAPI()
	})

	onBeforeUnmount(() => {
		try {
			player.value?.destroy()
		} catch {
			// Silently handle destroy errors
		}
	})

	watch(videoId, (newVideoId, oldVideoId) => {
		if (newVideoId !== oldVideoId && player.value) {
			updateVideo(newVideoId)
		}
	}, { flush: 'post' })

	return {
		playerId,
		isPlaying,
		hasPlayedOnce,
		isClient,
		togglePlay,
		hasError,
		errorMessage,
	}
}
