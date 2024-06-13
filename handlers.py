from main import bot, dp
from keyboards import keyboard
from aiogram import types
from aiogram.dispatcher.filters import Command
from aiogram.types import WebAppData
import json
import requests
from aiogram.types.message import ContentType


@dp.message_handler(Command('start'))
async def start(message: types.Message):
    await bot.send_message(message.chat.id, 'Працює Grocery Store',
                           reply_markup=keyboard)


PRICE = {
    '1': [types.LabeledPrice(label='Item1', amount=100000)],
    '2': [types.LabeledPrice(label='Item2', amount=200000)],
    '3': [types.LabeledPrice(label='Item3', amount=300000)],
    '4': [types.LabeledPrice(label='Item4', amount=400000)],
    '5': [types.LabeledPrice(label='Item5', amount=500000)],
    '6': [types.LabeledPrice(label='Item6', amount=600000)]
}

PAYMENT_TOKEN = '1877036958:TEST:3dd6fdaceb0084a89d3912077322a5e02d646d72'
@dp.message_handler(content_types='web_app_data')
async def buy_process(web_app_message):
    await bot.send_invoice(web_app_message.chat.id,
                           title='Food',
                           description='Description',
                           provider_token=PAYMENT_TOKEN,
                           currency='usd',
                           need_email=True,
                           prices=PRICE[f'{web_app_message.web_app_data.data}'],
                           start_parameter='example',
                           payload='some_invoice')


@dp.pre_checkout_query_handler(lambda query: True)
async def pre_checkout_process(pre_checkout: types.PreCheckoutQuery):
    await bot.answer_pre_checkout_query(pre_checkout.id, ok=True)


@dp.message_handler(content_types=types.ContentType.SUCCESSFUL_PAYMENT)
async def successful_payment(message: types.Message):
    await bot.send_message(message.chat.id, 'Платіж успішно виконаний!')
