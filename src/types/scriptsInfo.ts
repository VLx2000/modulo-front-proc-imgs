export type ScriptInfo = {
    scriptFilename: string|null,
    name: string,
    command: string,
    script: File|null,
    "static files": File[]|null,
    inputs: any[],
    outputs: any[]
}