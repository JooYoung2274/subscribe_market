import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateSubscribeDto } from './dto/CreateSubscribeDto';
import { UpdateSubscribeDto } from './dto/UpdateSubscribeDto';

import { Temporal } from '@js-temporal/polyfill';
import { SubscribeRepository } from './subscribe.repository';

@Injectable()
export class SubscribeService {
  constructor(private subscribeRepository: SubscribeRepository) {}

  async createSubscribe(body: CreateSubscribeDto, user) {
    try {
      const { cycle, ItemId } = body;
      const oauthId = user.id;

      // 이것도 나중에 DI로 수정해야함
      let now = Temporal.Now.plainDateISO();
      now = now.add({ days: cycle });

      const newSubscribe = await this.subscribeRepository.createSubscribe({
        oauthId,
        ItemId,
        cycle,
      });

      const subscribeId = newSubscribe.id;

      return await this.subscribeRepository.createAlarm({ subscribeId, now });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateSubscribe(body: UpdateSubscribeDto, subscribeId: number, user) {
    try {
      const { cycle } = body;
      const oauthId = user.id;

      let now = Temporal.Now.plainDateISO();
      now = now.add({ days: cycle });

      return await this.subscribeRepository.updateSubscribeAndAlarmBySubscribeId(
        {
          subscribeId,
          oauthId,
          cycle,
          now,
        },
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteSubscribe(subscribeId: number, user) {
    try {
      const oauthId = user.id;

      const isSubscribe =
        await this.subscribeRepository.findSubscribe(subscribeId);

      if (isSubscribe.UserId !== oauthId) {
        throw new BadRequestException();
      }

      return await this.subscribeRepository.deleteSubscribe(subscribeId);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getSubscribeList(user: { id: number }) {
    try {
      const oauthId = user.id;
      return await this.subscribeRepository.findSubscribeList(oauthId);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
