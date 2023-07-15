const util = require("util")
const exec = util.promisify(require("child_process").exec)

// The db might not be ready when the process detaches from docker.
// We use a incremental backoff time retry to run the migration
let timeout = 1000
const migrateDb = async () => {
    console.log('Running migration')
    setTimeout(() => {
        exec("npx prisma migrate dev")
                .then(() => {
                    console.log('Migration done')
                    process.exit()
                })
                .catch(err => {
                    console.log(err)
                    if(timeout < 8001) {
                        console.log('Database not ready. Retrying...')
                        migrateDb()
                        timeout *= 2
                    } else {
                        console.log('Could not initialize the database...')
                        process.exit()
                    }
                })
        },timeout)

}

migrateDb()
