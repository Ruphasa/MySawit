import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async validateUser(username: string, pass: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(pass, user.password))) {
      // Create a user object without the password field
      const { password: _password, ...result } = user;
      return result as Omit<User, 'password'>;
    }
    return null;
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  // Helper to create initial user for demo
  async createInitialUser() {
    const existing = await this.userRepository.findOne({ where: { username: 'admin' } });
    if (!existing) {
      const user = this.userRepository.create({
        username: 'admin',
        password: 'admin123', // Will be hashed by @BeforeInsert
      });
      await this.userRepository.save(user);
    }
  }
}
