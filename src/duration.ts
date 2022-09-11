export enum DurationUnit {
  millisecond = 1,
  second = 1000 * millisecond,
  minute = 60 * second,
  hour = 60 * minute,
  day = 24 * hour,
  week = 7 * day,

  year = (365 + 1 / 4 - 1 / 100 + 1 / 400) * day,
  decade = 10 * year,
  century = 10 * decade,
  millennium = 10 * century,

  // Geologic time scale
  age = 10 * millennium,
  subepoch = 10 * age,
  epoch = 10 * subepoch,
  period = 10 * epoch,
  era = 10 * period,
  eon = 10 * era,

  // Non sequitur
  month = year / 12,
}

export class Duration {
  constructor(
    public readonly value: number,
    public readonly unit: DurationUnit
  ) {}

  divide(duration: Duration): Duration {
    return new Duration(this.value / duration.to(this.unit).value, this.unit)
  }

  minus(duration: Duration): Duration {
    return new Duration(this.value - duration.to(this.unit).value, this.unit)
  }

  multiply(duration: Duration): Duration {
    return new Duration(this.value * duration.to(this.unit).value, this.unit)
  }

  plus(duration: Duration): Duration {
    return new Duration(this.value + duration.to(this.unit).value, this.unit)
  }

  to(unit: DurationUnit): Duration {
    return new Duration((this.value * this.unit) / unit, unit)
  }
}
