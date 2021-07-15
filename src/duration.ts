export enum DurationUnit {
  millisecond = 1,
  second = 1000 * millisecond,
  minute = 60 * second,
  hour = 60 * minute,
  day = 24 * hour,
  week = 7 * day,
}

export class Duration {
  constructor(readonly value: number, readonly unit: DurationUnit) {}

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
