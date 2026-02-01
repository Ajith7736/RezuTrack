import { ResumeContentProps } from '@/types/types'


export function ProfileSection(content: Partial<Pick<ResumeContentProps, 'email' | 'address' | 'phonenumber' | 'links' | 'personaldetails'>> | null): string {

  const linkFaClasses: Record<string, string> = {
    github: 'fab fa-github',
    linkedin: 'fab fa-linkedin',
    website: 'fas fa-globe',
    'date of birth': 'fas fa-calendar-alt',
    nationality: 'fas fa-flag',
    'passport or id': 'fas fa-id-card',
    'marital status': 'fas fa-ring',
    'military service': 'fas fa-shield-alt',
    'driving license': 'fas fa-id-card-alt',
    'gender/pronoun': 'fas fa-transgender-alt',
    disability: 'fas fa-wheelchair',
    visa: 'fas fa-passport',
    height: 'fas fa-ruler-vertical',
    'links / social profiles': 'fas fa-link',
    search: 'fas fa-search',
    gitbook: 'fas fa-book',
    medium: 'fab fa-medium',
    orcid: 'fas fa-id-badge',
    skype: 'fab fa-skype',
    bluesky: 'fas fa-cloud',
    threads: 'fab fa-threads',
    x: 'fab fa-x-twitter',
    discord: 'fab fa-discord',
    dribbble: 'fab fa-dribbble',
    behance: 'fab fa-behance',
    'stack overflow': 'fab fa-stack-overflow',
    gitlab: 'fab fa-gitlab',
    quora: 'fab fa-quora',
    facebook: 'fab fa-facebook',
    instagram: 'fab fa-instagram',
    wechat: 'fab fa-weixin',
    'hugging face': 'fas fa-robot',
    kaggle: 'fab fa-kaggle',
    youtube: 'fab fa-youtube',
    tiktok: 'fab fa-tiktok',
    signal: 'fas fa-signal',
    telegram: 'fab fa-telegram',
    whatsapp: 'fab fa-whatsapp',
  }

  const personalDetails = content?.personaldetails?.map((detail) => {
    return `<span><i class="${linkFaClasses[detail.name]} icon"></i>${detail.value}</span>`
  }) ?? []

  const links = content?.links?.map((link) => {
    return `<a  href="${link.link}"><i class="${linkFaClasses[link.name]} icon"></i>${link.label}</a>`
  }) ?? []


  const userdataicons = {
    email: '<i class="fa-solid fa-envelope icon"></i>',
    phonenumber: '<i class="fa-solid fa-phone icon"></i>',
    address: '<i class="fa-solid fa-location-dot icon"></i>'
  }


  const fields = [
    content?.email ? '<span>' + userdataicons['email'] + content?.email + '</span>' : undefined,
    content?.phonenumber ? '<span>' + userdataicons['phonenumber'] + content?.phonenumber + '</span>' : undefined,
    content?.address ? '<span>' + userdataicons['address'] + content?.address + '</span>' : undefined,
    ...personalDetails,
    ...links
  ]

  const text = fields.filter(Boolean).join(' <span> | </span> ')


  return text;
}
