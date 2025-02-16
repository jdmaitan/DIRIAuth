type LogLevel = "debug" | "info" | "warn" | "error";

class Logger
{
    private levels: LogLevel[]; // Niveles de log disponibles.
    private currentLevel: LogLevel; // Nivel de log actual.

    constructor()
    {
        this.levels = ["debug", "info", "warn", "error"]; // Define los niveles de log.
        this.currentLevel = "debug"; // Nivel de log por defecto.
    }

    setLevel(level: LogLevel): void
    {
        if (this.levels.includes(level))
        { // Verifica si el nivel proporcionado es válido.
            this.currentLevel = level; // Establece el nuevo nivel de log.
        } else
        {
            console.error(`Nivel de log no válido: ${level}`); // Muestra un error si el nivel no es válido.
        }
    }

    debug(message: string): void
    {
        this.log("debug", message); // Registra un mensaje de depuración.
    }

    info(message: string): void
    {
        this.log("info", message); // Registra un mensaje informativo.
    }

    warn(message: string): void
    {
        this.log("warn", message); // Registra una advertencia.
    }

    error(message: string): void
    {
        this.log("error", message); // Registra un error.
    }

    private log(level: LogLevel, message: string): void
    {
        const levelIndex = this.levels.indexOf(level); // Obtiene el índice del nivel del mensaje.
        const currentLevelIndex = this.levels.indexOf(this.currentLevel); // Obtiene el índice del nivel actual.

        // Imprime el mensaje solo si el nivel del mensaje es mayor o igual al nivel actual.
        if (levelIndex >= currentLevelIndex)
        {
            const timestamp = new Date().toISOString(); // Obtiene la marca de tiempo actual.
            console[level](`[${level.toUpperCase()}] ${timestamp}: ${message}`); // Imprime el mensaje con el formato adecuado.
        }
    }
}

const logger = new Logger(); // Crea una instancia del logger.

export default logger; // Exporta la instancia del logger.