

export interface IDependencyInjection {
	register<T>(key: string, value: T): void
}