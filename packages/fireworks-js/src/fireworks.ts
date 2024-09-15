import { Explosion } from './explosion.js'
import { floor, randomFloat, randomInt } from './helpers.js'
import { Mouse } from './mouse.js'
import { Options } from './options.js'
import { RequestAnimationFrame } from './raf.js'
import { Resize } from './resize.js'
import { Sound } from './sound.js'
import { Trace } from './trace.js'
import type { FireworksOptions, FireworksTypes } from './types.js'

declare const __VERSION__: string

export class Fireworks {
  private target: Element | HTMLCanvasElement
  private container: Element
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private width: number
  private height: number
  private traces: Trace[] = []
  private explosions: Explosion[] = []
  private waitStopRaf: (() => void) | null
  private running = false

  private readonly opts: Options
  private readonly sound: Sound
  private readonly resize: Resize
  private readonly mouse: Mouse
  private readonly raf: RequestAnimationFrame

  constructor(
    container: Element | HTMLCanvasElement,
    options: FireworksOptions = {}
  ) {
    this.target = container
    this.container = container

    this.opts = new Options()

    this.createCanvas(this.target)
    this.updateOptions(options)

    this.sound = new Sound(this.opts)
    this.resize = new Resize(
      this.opts,
      this.updateSize.bind(this),
      this.container
    )
    this.mouse = new Mouse(this.opts, this.canvas)
    this.raf = new RequestAnimationFrame(this.opts, this.render.bind(this))
  }

  get isRunning(): boolean {
    return this.running
  }

  get version(): string {
    return __VERSION__
  }

  get currentOptions(): Options {
    return this.opts
  }

  start(): void {
    if (this.running) return

    if (!this.canvas.isConnected) {
      this.createCanvas(this.target)
    }

    this.running = true
    this.resize.mount()
    this.mouse.mount()
    this.raf.mount()
  }

  stop(dispose = false): void {
    if (!this.running) return

    this.running = false
    this.resize.unmount()
    this.mouse.unmount()
    this.raf.unmount()
    this.clear()

    if (dispose) {
      this.canvas.remove()
    }
  }

  async waitStop(dispose?: boolean): Promise<void> {
    if (!this.running) return

    return new Promise<void>((resolve) => {
      this.waitStopRaf = () => {
        if (!this.waitStopRaf) return
        requestAnimationFrame(this.waitStopRaf)
        if (!this.traces.length && !this.explosions.length) {
          this.waitStopRaf = null
          this.stop(dispose)
          resolve()
        }
      }

      this.waitStopRaf()
    })
  }

  pause(): void {
    this.running = !this.running
    if (this.running) {
      this.raf.mount()
    } else {
      this.raf.unmount()
    }
  }

  clear(): void {
    if (!this.ctx) return

    this.traces = []
    this.explosions = []
    this.ctx.clearRect(0, 0, this.width, this.height)
  }

  launch(options: number | FireworksTypes.LaunchOptions): void {
    let count = 1
    let x: number | undefined
    let y: number | undefined
    let withTrace = true

    if (typeof options === 'number') {
      count = options
    } else {
      count = options.count ?? 1
      x = options.x
      y = options.y
      withTrace = options.withTrace ?? true
    }

    for (let i = 0; i < count; i++) {
      this.createTrace(x, y, withTrace)
    }

    if (!this.waitStopRaf) {
      this.start()
      this.waitStop()
    }
  }

  updateOptions(options: FireworksOptions): void {
    this.opts.update(options)
  }

  updateSize({
    width = this.container.clientWidth,
    height = this.container.clientHeight
  }: Partial<FireworksTypes.Sizes> = {}): void {
    this.width = width
    this.height = height

    this.canvas.width = width
    this.canvas.height = height

    this.updateBoundaries({
      ...this.opts.boundaries,
      width,
      height
    })
  }

  updateBoundaries(boundaries: Partial<FireworksTypes.Boundaries>): void {
    this.updateOptions({ boundaries })
  }

  private createCanvas(el: Element | HTMLCanvasElement): void {
    if (el instanceof HTMLCanvasElement) {
      if (!el.isConnected) {
        document.body.append(el)
      }

      this.canvas = el
    } else {
      this.canvas = document.createElement('canvas')
      this.container.append(this.canvas)
    }

    this.ctx = this.canvas.getContext('2d')!
    this.updateSize()
  }

  private render(): void {
    if (!this.ctx || !this.running) return

    const { opacity, lineStyle, lineWidth } = this.opts
    this.ctx.globalCompositeOperation = 'destination-out'
    this.ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`
    this.ctx.fillRect(0, 0, this.width, this.height)
    this.ctx.globalCompositeOperation = 'lighter'
    this.ctx.lineCap = lineStyle
    this.ctx.lineJoin = 'round'
    this.ctx.lineWidth = randomFloat(lineWidth.trace.min, lineWidth.trace.max)

    this.initTrace()
    this.drawTrace()
    this.drawExplosion()
  }

  private createTrace(x?: number, y?: number, withTrace: boolean = true): void {
    const {
      hue,
      rocketsPoint,
      boundaries,
      traceLength,
      traceSpeed,
      acceleration,
      mouse,
      vertical
    } = this.opts

    const random = x === undefined || y === undefined

    var sx = (this.width * randomInt(rocketsPoint.min, rocketsPoint.max)) / 100
    var sy = this.height
    var dx = 0
    var dy = 0

    if (random) {
      var mx = (this.mouse.x && mouse.move) || this.mouse.active
      var my = (this.mouse.y && mouse.move) || this.mouse.active
      dx = mx
        ? this.mouse.x
        : randomInt(boundaries.x, boundaries.width - boundaries.x * 2)
      dy = my ? this.mouse.y : randomInt(boundaries.y, boundaries.height * 0.5)
    } else {
      dx = x
      dy = y
    }

    if (withTrace && vertical) {
      sx = dx
    }

    if (!withTrace) {
      sx = dx
      sy = dy
    }

    this.traces.push(
      new Trace({
        x: sx,
        y: sy,
        dx: dx,
        dy: dy,
        ctx: this.ctx,
        hue: randomInt(hue.min, hue.max),
        speed: traceSpeed,
        acceleration,
        traceLength: floor(traceLength)
      })
    )
  }

  private initTrace(): void {
    if (this.waitStopRaf) return

    const { delay, mouse } = this.opts
    if (
      this.raf.tick > randomInt(delay.min, delay.max) ||
      (this.mouse.active && mouse.max > this.traces.length)
    ) {
      this.createTrace()
      this.raf.tick = 0
    }
  }

  private drawTrace(): void {
    let traceLength = this.traces.length
    while (traceLength--) {
      this.traces[traceLength]!.draw()
      this.traces[traceLength]!.update((x: number, y: number, hue: number) => {
        this.initExplosion(x, y, hue)
        this.sound.play()
        this.traces.splice(traceLength, 1)
      })
    }
  }

  private initExplosion(x: number, y: number, hue: number): void {
    const {
      particles,
      flickering,
      lineWidth,
      explosion,
      brightness,
      friction,
      gravity,
      decay
    } = this.opts

    let particlesLength = floor(particles)
    while (particlesLength--) {
      this.explosions.push(
        new Explosion({
          x,
          y,
          ctx: this.ctx,
          hue,
          friction,
          gravity,
          flickering: randomInt(0, 100) <= flickering,
          lineWidth: randomFloat(
            lineWidth.explosion.min,
            lineWidth.explosion.max
          ),
          explosionLength: floor(explosion),
          brightness,
          decay
        })
      )
    }
  }

  private drawExplosion(): void {
    let length = this.explosions.length
    while (length--) {
      this.explosions[length]!.draw()
      this.explosions[length]!.update(() => {
        this.explosions.splice(length, 1)
      })
    }
  }
}
