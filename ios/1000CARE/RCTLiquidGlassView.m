#import <React/RCTViewManager.h>
#import <UIKit/UIKit.h>

@interface RCTLiquidGlassView : UIView

@property (nonatomic, strong) UIVisualEffectView *effectView;
@property (nonatomic, copy) NSString *glassStyle;

@end

@implementation RCTLiquidGlassView

- (instancetype)init
{
  if (self = [super init]) {
    _glassStyle = @"clear";
    self.backgroundColor = UIColor.clearColor;
    self.clipsToBounds = YES;

    _effectView = [[UIVisualEffectView alloc] initWithEffect:[self makeEffect]];
    _effectView.backgroundColor = UIColor.clearColor;
    _effectView.userInteractionEnabled = NO;
    _effectView.clipsToBounds = YES;
    [self addSubview:_effectView];
  }

  return self;
}

- (void)setGlassStyle:(NSString *)glassStyle
{
  _glassStyle = [glassStyle copy] ?: @"clear";
  self.effectView.effect = [self makeEffect];
}

- (UIVisualEffect *)makeEffect
{
  if (@available(iOS 26.0, *)) {
    UIGlassEffectStyle style = [self.glassStyle isEqualToString:@"regular"]
      ? UIGlassEffectStyleRegular
      : UIGlassEffectStyleClear;
    return [UIGlassEffect effectWithStyle:style];
  }

  return [UIBlurEffect effectWithStyle:UIBlurEffectStyleSystemUltraThinMaterialLight];
}

- (void)layoutSubviews
{
  [super layoutSubviews];
  self.effectView.frame = self.bounds;
  self.effectView.layer.cornerRadius = self.layer.cornerRadius;
  self.effectView.layer.cornerCurve = kCACornerCurveContinuous;
}

- (void)didAddSubview:(UIView *)subview
{
  [super didAddSubview:subview];
  if (subview != self.effectView) {
    [self sendSubviewToBack:self.effectView];
  }
}

@end

@interface RCTLiquidGlassViewManager : RCTViewManager
@end

@implementation RCTLiquidGlassViewManager

RCT_EXPORT_MODULE(RCTLiquidGlassView)
RCT_EXPORT_VIEW_PROPERTY(glassStyle, NSString)

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

- (UIView *)view
{
  return [RCTLiquidGlassView new];
}

@end
