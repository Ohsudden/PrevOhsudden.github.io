import aiogram
from aiogram import Bot, Dispatcher, executor, types
import asyncio
BOT_TOKEN = '7386401380:AAGO96QtljKyPQ32bj85e4s_VznJAOpXLb8'

loop = asyncio.new_event_loop();
bot = Bot(BOT_TOKEN, parse_mode='HTML')
dp = Dispatcher(bot, loop)


if __name__ == "__main__":
    from handlers import dp
    executor.start_polling(dp)
