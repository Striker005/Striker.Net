from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes
import random
import string

# Replace 'YOUR_BOT_TOKEN' with the token you received from BotFather
TOKEN = '7854967715:AAEmdncHLasWBWRAEJmZjlDTRmQlogwSGqU'
# Replace 'YOUR_ADMIN_ID' with your actual Telegram User ID
ADMIN_ID = '1786950751'

def generate_hex_payload(length):
    return ''.join(f"\\\\x{random.randint(0, 255):02x}" for _ in range(length))

async def payload(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    count = int(context.args[0]) if context.args and context.args[0].isdigit() else 1
    length = int(context.args[1]) if len(context.args) > 1 and context.args[1].isdigit() else 100

    if length < 1 or length > 300:
        await update.message.reply_text("Length must be between 1 and 300.")
        return

    payloads = [generate_hex_payload(length) for _ in range(count)]
    lua_payloads = '\n'.join(f'"{p}",' for p in payloads)  # escape commas

    await update.message.reply_text(f"Generated Payloads:\n```\n{lua_payloads}\n```", parse_mode='MarkdownV2')

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text('Hello! Send /help to see the available commands.')

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    commands = (
        "/start - Welcome message and introduction.\n"
        "/help - List of all available commands.\n"
        "/payload <count> <length> - Generate <count> random hex payloads of specified length.\n"
    )
    await update.message.reply_text(f"Available Commands:\n{commands}")

def main():
    application = ApplicationBuilder().token(TOKEN).build()

    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(CommandHandler("payload", payload))

    application.run_polling()

if __name__ == '__main__':
    main()
